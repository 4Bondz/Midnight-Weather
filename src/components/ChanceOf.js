import React, { Component } from "react";
import "../css/chanceOf.css";

import WeatherIcon from "./WeatherIcon";

function ChanceOf() {
  return (
    <div className="chance-of">
      <WeatherIcon size={50} type="Sunny"></WeatherIcon>
      <div>50%</div>
    </div>
  );
}

export default ChanceOf;
