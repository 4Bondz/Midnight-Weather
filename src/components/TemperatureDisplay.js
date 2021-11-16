import React, { Component } from "react";

import "../css/temperatureDisplay.css";

function TemperatureDisplay(props) {
  return (
    <div
      className="temperature-display"
      style={{ fontSize: props.size || "50px" }}
    >
      {props.temperature}°{props.cf}
    </div>
  );
}

export default TemperatureDisplay;
