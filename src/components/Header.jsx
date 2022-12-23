import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ar-ly";
import "moment/locale/en-gb";
import "moment/locale/fr";
import MySwitch from "./Switch";
import SearchInput from "./Search";
import NavBar from "./NavBar";
import DropdownButton from "./DropdownButton";
import { useSelector } from "react-redux";

function Header() {
  const language = useSelector((state) => state.lang.lang);
  const [date, setDate] = useState("ar-ly");
  moment.locale(date);
  useEffect(() => {
    switch (language) {
      case "eg":
        setDate("ar-ly");
        break;
      case "us":
        setDate("en-gb");
        break;
      case "fr":
        setDate("fr");
        break;
      default:
        setDate("eg");
        break;
    }
  }, [language]);
  return (
    <div id="fullMenu">
      <div id="upperMenu">
        <div id="menu-Date">
          <div id="date" className="menuDateLang">
            {moment().format("dddd Do MMMM YYYY")}
          </div>
        </div>
        <div id="lang">
          <DropdownButton />
        </div>
      </div>
      <div id="main-Header">
        <div
          id="siteLogo"
          onClick={() => {
            window.location.reload();
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>الخبر</h1>
          <h3>AlKhabar</h3>
        </div>
        <div id="main-header-extra">
          <div id="searchInput">{<SearchInput />}</div>
          <div id="mySwitch">{<MySwitch />}</div>
        </div>
      </div>
      <div id="menu-Detail" className="sticky">
        {<NavBar />}
      </div>
    </div>
  );
}

export default Header;
