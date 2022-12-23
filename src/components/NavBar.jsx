import React, { useEffect } from "react";
import { Menu } from "antd";
import {
  MdViewHeadline,
  MdSportsSoccer,
  MdAttachMoney,
  MdLaptopMac,
  MdOutlineScience,
} from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { RiMovie2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getDataSlice } from "../redux/dataSlice";
import { getNewsByCategory } from "../getData";
import { setSearch } from "./Content";

const NavBar = () => {
  const language = useSelector((state) => state.lang.lang);
  const menuItems = [
    {
      key: "general",
      icon: <MdViewHeadline />,
      label: language === "eg" ? "الرئيسية" : "Home",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "sports",
      icon: <MdSportsSoccer />,
      label: language === "eg" ? "رياضة" : "Sports",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "entertainment",
      icon: <RiMovie2Fill />,
      label: language === "eg" ? "ثقافة و فن" : "Art & Media",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "business",
      icon: <MdAttachMoney />,
      label: language === "eg" ? "اعمال" : "Bussiness",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "health",
      icon: <GiHealthNormal />,
      label: language === "eg" ? "صحة" : "Health",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "technology",
      icon: <MdLaptopMac />,
      label: language === "eg" ? "تكنولوجيا" : "Technology",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
    {
      key: "science",
      icon: <MdOutlineScience />,
      label: language === "eg" ? "علم" : "Science",
      onClick: (e) => {
        setSearch(false);
        getNewsByCategory(e.key, language).then((data) => {
          dispatch(getDataSlice(data));
        });
      },
    },
  ];
  setSearch(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getNewsByCategory("general", language).then((data) => {
      dispatch(getDataSlice(data));
      if (language !== "eg") {
        document.querySelector("body").classList.add("leftToRight");
      } else {
        document.querySelector("body").classList.remove("leftToRight");
      }
    });
  });

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["general"]}
      items={menuItems}
    ></Menu>
  );
};

export default NavBar;
