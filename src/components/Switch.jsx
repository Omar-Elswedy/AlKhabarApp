import React, { useEffect, useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { Switch, Space } from "antd";

function setDayOrNight(value = false) {
  if (value === true) {
    document.querySelector("body").classList.remove("darkTheme");
    document.getElementById("upperMenu").classList.remove("menuDateDarkTheme");
    document.getElementById("siteLogo").classList.remove("darkTheme");
    document
      .querySelector("#menu-Detail .ant-menu")
      .classList.remove("darkMenu");
    document.querySelector(".ant-btn").classList.remove("menuDateDarkTheme");
  } else {
    document.querySelector("body").classList.add("darkTheme");
    document.getElementById("upperMenu").classList.add("menuDateDarkTheme");
    document.getElementById("siteLogo").classList.add("darkTheme");
    document.querySelector("#menu-Detail .ant-menu").classList.add("darkMenu");
    document.querySelector(".ant-btn").classList.add("menuDateDarkTheme");
  }
}

const MySwitch = () => {
  const currentTime = new Date().getHours();
  const isDayTime = currentTime > 6 && currentTime < 20;
  const [time, setTime] = useState(isDayTime);
  useEffect(() => {
    if (!time) {
      setDayOrNight(time);
    }
  });
  return (
    <div id="switchDisplayIcon">
      <Space direction="vertical">
        <Switch
          checkedChildren={<CiLight />}
          unCheckedChildren={<CiDark />}
          checked={time ? true : false}
          style={time ? { backgroundColor: "#0d4c92" } : null}
          onClick={() => {
            setTime(!time);
          }}
          onChange={(value) => {
            setDayOrNight(value);
          }}
        />
      </Space>
    </div>
  );
};

export default MySwitch;
