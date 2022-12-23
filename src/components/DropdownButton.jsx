import React, { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import { FaGlobe } from "react-icons/fa";
import Flag from "./Flags";
import { useDispatch } from "react-redux";
import { getLangSlice } from "../redux/languageSlice";

const items = [
  {
    label: "عربي",
    key: "eg",
    icon: <Flag country={"eg"} />,
  },
  {
    label: "English",
    key: "us",
    icon: <Flag country={"us"} />,
  },
  {
    label: "Français",
    key: "fr",
    icon: <Flag country={"fr"} />,
  },
];

const DropdownButton = () => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState("eg");
  const menuProps = {
    items,
    onClick: (e) => {
      setLang(e.key);
    },
  };
  useEffect(() => {
    dispatch(getLangSlice(lang));
  });

  return (
    <Space wrap>
      <Dropdown.Button menu={menuProps} placement="bottom" icon={<FaGlobe />}>
        {lang === "eg" ? "اللغة" : "language"}
      </Dropdown.Button>
    </Space>
  );
};
export default DropdownButton;
