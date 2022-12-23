import React from "react";
import Spinner from "./Spinner";
import { HiPencil } from "react-icons/hi";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import logo from "../assets/logo.png";

export function setSpinner(propsData, myDefault) {
  if (propsData === null) {
    return <Spinner />;
  }
  return myDefault;
}

function SideElement(props, index) {
  let myDate = new Date(props.publishedAt);
  let elementDate = myDate.toLocaleDateString("ar-EG");
  return (
    <div
      id={`element${index + 1}`}
      className="element"
      key={index}
      onClick={() => {
        window.open(props.url);
      }}
    >
      {props.urlToImage ? (
        <img className="elementImage" src={props.urlToImage} alt={""} />
      ) : (
        <img className="elementImage" src={logo} alt={""} />
      )}
      <div id="elementRest">
        <div className="elementData">
          <p className="elementTitle">{setSpinner(props.title, props.title)}</p>
        </div>
        <div className="elementAddDetails">
          <div className="elementFullAuthor">
            <div className="elementAuthorIcon">
              <HiPencil />
            </div>
            <div className="myElementAuthor">
              <p className="elementAuthor">
                {props.author === null || props.author.length > 30
                  ? "لا يوجد"
                  : props.author}
              </p>
            </div>
          </div>
          <div className="elementFullDate">
            <div className="elementDateIcon">
              <BsFillCalendar2DateFill />
            </div>
            <div className="myElementDate">
              <p className="elementDate">
                {elementDate === null ? "لا يوجد" : elementDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideElement;
