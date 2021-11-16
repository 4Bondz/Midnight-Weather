import React, { Component } from "react";

import "../css/dailyforecastring.css";

function DailyForecastRing(props) {
  let rows = [];
  let numrows = 12;
  /*  
  --red: #A20008;
  --yellow: #A5A100;
  --blue: #003E6A;
  --green: #008400;
  */
  let colors = [
    "#303E37",
    "#303E37",
    "#A1A095",
    "#A1A095",
    "#65676C",
    "#65676C",
    "#65676C",
    "#65676C",
    "#7D857C",
    "7D857C",
    "#cfcdb3",
    "white",
  ];
  for (let i = 0; i < numrows; i++) {
    rows.push(i);
  }
  return (
    <div className="large-weather-forecast">
      <div className="large-weather-cutout"></div>
      {rows.map((i) => (
        <div
          className="large-weather-hour"
          style={{
            transform: `rotate(${i * 30 + 15}deg) translate(0px, -100px)`,
            zIndex: `${i}`,
            backgroundColor: `${colors[i]}`,
            borderColor: `${colors[i]}`,
            boxShadow: `inset 0px 0px 20px 0px ${colors[i]}3, 0px 0px 20px 0px ${colors[i]}`,
          }}
          //   style={{
          //     border: `50px solid ${colors[i]}`,
          //     borderBottomColor: "transparent",
          //     borderLeftColor: "transparent",
          //     borderRightColor: "transparent",
          //     transform: `rotate(${0}deg)`,
          //     zIndex: `${i + 5}`,
          //   }}
        ></div>
      ))}
      <div style={{ position: "absolute", zIndex: "50" }}>{props.children}</div>
    </div>
  );
}

export default DailyForecastRing;
