import React from "react";
import { Input, Space } from "antd";
import { getNewsBySearch } from "../getData";
import { getSearchSlice } from "../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSearchValue, setSearch } from "./Content";

const { Search } = Input;

const SearchInput = () => {
  const language = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();
  return (
    <Space direction="vertical">
      <Search
        placeholder="بحث"
        allowClear
        size="large"
        onSearch={(value) => {
          setSearch(true);
          getNewsBySearch(value, language).then((result) => {
            getSearchValue(value);
            dispatch(getSearchSlice(result));
          });
          document.querySelector(".ant-input").value = "";
        }}
        enterButton
      />
    </Space>
  );
};

export default SearchInput;
