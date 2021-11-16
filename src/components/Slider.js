import React, { Component } from "react";
import Switch from "@mui/material/Switch";

import "../css/slider.css";

// We want this slider to take in some props
// We want to pass down swapCF from the container

function Slider(props) {
  function handleChange(e) {
    console.log(e.target.checked);
    props.onChange(e.target.checked);
  }

  return (
    <div
      className="slider"
      style={props.size / 25 > 1 ? { gap: (props.size / 25) * 10 + "px" } : {}}
    >
      <div style={{ fontSize: props.size }}>F</div>
      <Switch
        sx={{
          transform: `scale(${props.size / 25},${props.size / 25})`,
        }}
        onChange={(ev) => {
          props.onChange(ev.target.checked);
        }}
        color="default"
      />
      <div style={{ fontSize: props.size }}>C</div>
    </div>
  );
}

export default Slider;
