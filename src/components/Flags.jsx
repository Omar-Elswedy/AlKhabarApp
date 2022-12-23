import React from "react";
import ReactCountryFlag from "react-country-flag";

function Flag(props) {
  return (
    <div>
      <ReactCountryFlag
        countryCode={props.country}
        svg
        style={{ margin: "10px" }}
      />
    </div>
  );
}

export default Flag;
