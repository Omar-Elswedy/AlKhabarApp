() => {
  var me = this;
  const Table = A.Table;
  const Tag = A.Tag;
  const Panel = A.Drawer;
  const Form = A.Form;
  const DatePicker = A.DatePicker;
  const Row = A.Row;
  const Col = A.Col;
  const Input = A.Input;
  const InputNumber = A.InputNumber;
  const Select = A.Select;
  const Button = A.Button;
  const Space = A.Space;

  const [data, setData] = useState([]);
  const [size, setSize] = useState("small");
  const [searchTotal, setSearchTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    var params = {
      pagination: pagination,
      loading: true,
      total: 0,
      data: data,
    };
    load(params);
    loadCatalogs();
  }, []);

  load = (params = {}) => {
    setLoading(params.loading);

    let extraParametros =
      params.formulario && params.formulario.codeApplication
        ? ", codeApplication:'" + params.formulario.codeApplication + "'"
        : "";
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.fcreation
        ? ", createdDate:'" + params.formulario.fcreation + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.finicio
        ? ", startDate:'" + params.formulario.finicio + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.fexpiration
        ? ", expirationDate:'" + params.formulario.fexpiration + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.ramo
        ? ", lobCode:'" + params.formulario.ramo + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.producto
        ? ", productCode:'" + params.formulario.producto + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.estado
        ? ", entityState:'" + params.formulario.estado + "'"
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.polizaId
        ? ", policyId:" + params.formulario.polizaId
        : "");
    extraParametros =
      extraParametros +
      (params.formulario && params.formulario.tipoPoliza
        ? ", policyType:'" + params.formulario.tipoPoliza + "'"
        : "");

    exe("ExeChain", {
      chain: "cmdAdvanceSearchPolicy",
      context:
        "{row:{currentPage:" +
        params.pagination.current +
        ", pageSize:" +
        params.pagination.pageSize +
        extraParametros +
        "}}",
    }).then((r) => {
      if (r.ok) {
        var polizaPaginada = r.outData.data;
        var listaPoliza = [];
        var indiceResultado = 0;
        if (r.outData.total > 0) {
          setSearchTotal(r.outData.total);
          for (var index = 0; index < r.outData.total; index++) {
            var factor = (index + 1) / params.pagination.pageSize;
            if (
              factor > params.pagination.current - 1 &&
              factor <= params.pagination.current &&
              indiceResultado < polizaPaginada.length
            ) {
              listaPoliza.push(polizaPaginada[indiceResultado]);
              indiceResultado += 1;
            } else {
              listaPoliza.push({ id: "Loading data...  " + index });
            }
          }
        }
        setData(listaPoliza);
        setLoading(false);
        params.pagination.total = r.outData.total;
        setPagination(params.pagination);
      }
    });
  };
  /*Events*/
  handleTableChange = (pagination) => {
    var params = {
      pagination: pagination,
      loading: true,
      data: data,
      formulario: {
        codeApplication: codeApplicationValue,
        fcreation: fcreationValue
          ? fcreationValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        finicio: finicioValue
          ? finicioValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        fexpiration: fexpirationValue
          ? fexpirationValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        ramo: ramoValue,
        producto: productoValue,
        estado: estadoValue,
        polizaId: polizaIdValue,
        tipoPoliza: tipoPolizaValue,
      },
    };
    load(params);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const searchPolicies = (event) => {
    debugger;
    pagination.current = 1;
    var params = {
      pagination: pagination,
      loading: true,
      total: 0,
      data: data,
      formulario: {
        codeApplication: codeApplicationValue,
        fcreation: fcreationValue
          ? fcreationValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        finicio: finicioValue
          ? finicioValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        fexpiration: fexpirationValue
          ? fexpirationValue._d.toLocaleString("en-US", {}).split(",")[0]
          : "",
        ramo: ramoValue,
        producto: productoValue,
        estado: estadoValue,
        polizaId: polizaIdValue,
        tipoPoliza: tipoPolizaValue,
      },
    };
    load(params);
  };
  const onReset = (event) => {
    setCodeApplicationValue();
    setFcreationValue();
    setFinicioValue();
    setFexpirationValue();
    setRamoValue();
    setProductoValue();
    setEstadoValue();
    setPolizaIdValue();
    setTipoPolizaValue();
  };
  /*HTML FUNCTIONS*/
  function TagBox(props) {
    const stateName = props.stateName;
    switch (stateName) {
      case "ACTIVE":
        return <Tag color="green">{stateName}</Tag>;
      case "INACTIVE":
        return <Tag color="red">{stateName}</Tag>;
      default:
        return <Tag color="blue">{stateName}</Tag>;
    }
  }
  function DateFormat(props) {
    let fechaHoy = new Date();
    const fecha = props.fecha ? new Date(props.fecha) : fechaHoy;
    const formatoFecha = props.formato ? props.formato : "mm-dd-yyyy";
    const textoDefault = props.fecha == fechaHoy ? props.textoDefault : "";
    const map = {
      dd: zeroFill(fecha.getDate(), 2),
      mm: zeroFill(fecha.getMonth() + 1, 2),
      yyyy: fecha.getFullYear().toString(),
    };
    return textoDefault.length > 0
      ? textoDefault
      : formatoFecha.replace(/dd|mm|yyyy/gi, (matched) => map[matched]);
  }
  function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
    }
    return number + ""; // siempre devuelve tipo cadena
  }
  function MontoMoneda(props) {
    const moneda = props.moneda;
    const monto = parseFloat(props.monto);
    return moneda + " " + monto.toLocaleString("en-Us");
  }
  function Link(props) {
    const path = props.path;
    const id = props.id;
    const text = props.text;
    const href = path + id;
    return <a href={href}>{text}</a>;
  }

  //const [codeApplications, setCodeApplications] = useState([]);
  const [ramos, setRamos] = useState([]);
  const [productos, setProductos] = useState([]);

  const [codeApplicationValue, setCodeApplicationValue] = useState();
  const [fcreationValue, setFcreationValue] = useState();
  const [finicioValue, setFinicioValue] = useState();
  const [fexpirationValue, setFexpirationValue] = useState();
  const [ramoValue, setRamoValue] = useState();
  const [productoValue, setProductoValue] = useState();
  const [estadoValue, setEstadoValue] = useState();
  const [polizaIdValue, setPolizaIdValue] = useState();
  const [tipoPolizaValue, setTipoPolizaValue] = useState();

  loadCatalogs = () => {
    exe("RepoLob", { operation: "GET" }).then((pOutData) => {
      let ramoList = [];
      for (var index = 0; index < pOutData.outData.length; index++) {
        var item = pOutData.outData[index];
        ramoList.push({ name: item.name, value: item.code });
      }
      setRamos(ramoList);
    });
  };

  function handleCodeApplicationChange(value) {
    setCodeApplicationValue(event.target.value);
  }

  function handleFCreationChange(value) {
    setFcreationValue(value);
  }

  function handleFInicioChange(value) {
    setFinicioValue(value);
  }

  function handleFExpirationChange(value) {
    setFexpirationValue(value);
  }

  function handleRamoChange(value) {
    setRamoValue(value);
    exe("RepoProduct", {
      operation: "GET",
      filter: "lobCode='" + value + "'",
    }).then((pOutData) => {
      let ramoList = [];
      for (var index = 0; index < pOutData.outData.length; index++) {
        var item = pOutData.outData[index];
        ramoList.push({ name: item.name, value: item.code });
      }
      setProductos(ramoList);
    });
  }

  function handleProductoChange(value) {
    setProductoValue(value);
  }

  function handleEstadoChange(event) {
    setEstadoValue(event.target.value);
  }

  function handlePolizaChange(value) {
    setPolizaIdValue(value);
  }

  function handleTipoPolizaChange(value) {
    setTipoPolizaValue(value);
  }

  return (
    <DefaultPage
      title="Advanced Search"
      icon="file-search"
      extra={
        <Button type="primary" icon="filter" onClick={showDrawer}>
          Filter
        </Button>
      }
    >
      <Table dataSource={data} loading={loading} onChange={handleTableChange}>
        <Table.Columns
          title="Id"
          key="action"
          render={(text, record) => (
            <>
              <Link path="/#/lifePolicy/" id={record.id} text={record.id} />
            </>
          )}
        />
        <Table.Columns title="Policy Type" dataIndex="policyType" />
        <Table.Columns title="Code" dataIndex="code" />
        <Table.Columns
          title="State"
          dataIndex="entityState"
          render={(state) => (
            <>
              <TagBox stateName={state} />
            </>
          )}
        />
        <Table.Columns title="LOB" dataIndex="lob" />
        <Table.Columns title="Product" dataIndex="productCode" />
        <Table.Columns
          title="Issuance"
          dataIndex="activeDate"
          render={(issue) => (
            <>
              <DateFormat
                fecha={issue}
                textoDefault="Not Issued"
                formato="yyyy-mm-dd"
              />
            </>
          )}
        />
        <Table.Columns
          title="Holder"
          dataIndex="holderName"
          render={(text, record) => (
            <>
              <Link
                path="/#/contact/"
                id={record.holderId}
                text={record.holderName}
              />
            </>
          )}
        />
        <Table.Columns
          title="Start"
          dataIndex="start"
          render={(start) => (
            <>
              <DateFormat fecha={start} formato="yyyy-mm-dd" />
            </>
          )}
        />
        <Table.Columns
          title="Anniverssary"
          dataIndex="anniversary"
          render={(anniversary) => (
            <>
              <DateFormat fecha={anniversary} formato="yyyy-mm-dd" />
            </>
          )}
        />
        <Table.Columns title="Application Code" dataIndex="applicationCode" />
        <Table.Columns
          title="Action"
          key="action"
          render={(text, record) => (
            <>
              <Link path="/#/lifePolicy/" id={record.id} text="Open" />
            </>
          )}
        />
      </Table>
      <Panel
        title="Search Filter"
        width={520}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Form
          id="formFilter"
          name="advanced_search"
          ref={(form) => (this.form = form)}
        >
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Button icon="undo" size="small" onClick={onReset}>
                Reestablecer
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Form.Item name="codeApplication" label="Application Code">
                <Input
                  id="txtCodeApplication"
                  name="txtCodeApplication"
                  value={codeApplicationValue}
                  placeholder="Application Code Reference"
                  onChange={handleCodeApplicationChange}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item name="fechaCreacion" label="Creation Date">
                <DatePicker
                  id="dpkFechaCreacion"
                  name="dpkFechaCreacion"
                  placeholder="Select a date"
                  value={fcreationValue}
                  onChange={handleFCreationChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Form.Item name="fechaInicio" label="Start Date">
                <DatePicker
                  id="dpkFechaInicio"
                  name="dpkFechaInicio"
                  placeholder="Select a date"
                  value={finicioValue}
                  onChange={handleFInicioChange}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item name="fechaExpiracion" label="Expiration Date">
                <DatePicker
                  id="dpkFechaExpiracion"
                  name="dpkFechaExpiracion"
                  placeholder="Select a date"
                  value={fexpirationValue}
                  onChange={handleFExpirationChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Form.Item name="ramo" label="LOB">
                <Select
                  id="lstRamo"
                  name="lstRamo"
                  value={ramoValue}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="Select an option"
                  onChange={handleRamoChange}
                  allowClear
                  showSearch
                >
                  {ramos.map((item) => (
                    <Option value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item name="producto" label="Product">
                <Select
                  id="lstProducto"
                  name="lstProducto"
                  value={productoValue}
                  placeholder="Select an option"
                  onChange={handleProductoChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  showSearch
                >
                  {productos.map((item) => (
                    <Option value={item.value}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Form.Item name="estado" label="State">
                <Input
                  id="txtEstado"
                  name="txtEstado"
                  value={estadoValue}
                  placeholder="Workflow state"
                  onChange={handleEstadoChange}
                />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item name="polizaId" label="Id">
                <InputNumber
                  id="txtPoliza"
                  name="txtPoliza"
                  value={polizaIdValue}
                  placeholder="Policy Id"
                  onChange={handlePolizaChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <Form.Item name="tipoPoliza" label="Policy Type">
                <Select
                  id="lstTipoPoliza"
                  name="lstTipoPoliza"
                  value={tipoPolizaValue}
                  placeholder="Select an option"
                  onChange={handleTipoPolizaChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  showSearch
                >
                  <Option value="I">Individual Policy</Option>
                  <Option value="G">Group Policy</Option>
                  <Option value="C">Certificate</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="gutter-row">
              <br />
              <Button type="primary" icon="search" onClick={searchPolicies}>
                Search
              </Button>
              <br />
              <br />
              <Tag>{searchTotal}</Tag> Results
            </Col>
          </Row>
        </Form>
      </Panel>
    </DefaultPage>
  );
};
