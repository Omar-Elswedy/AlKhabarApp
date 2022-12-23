import React from "react";
import { Card } from "antd";
import { setSpinner } from "./SideElement";
import logo from "../assets/logo.png";

const { Meta } = Card;

const Cards = function (props, index) {
  return (
    <div id={`card${index + 1}`} className="my-card" key={index}>
      <Card
        key={index + 1}
        // loading={loaded ? true : false}
        hoverable
        style={{
          margin: "40px 10px",
          border: 0,
          textAlign: "start",
        }}
        cover={
          props.urlToImage ? (
            <img className="CardImage" src={props.urlToImage} alt={""} />
          ) : (
            <img className="CardImage" src={logo} alt={""} />
          )
        }
        onClick={() => {
          window.open(props.url);
        }}
      >
        <Meta
          title={setSpinner(props.title, props.title)}
          description={setSpinner(props.description, props.description)}
        />
      </Card>
    </div>
  );
};

export default Cards;
