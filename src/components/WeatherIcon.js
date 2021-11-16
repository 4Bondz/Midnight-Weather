import React, { Component } from "react";

import Sunny from "@mui/icons-material/WbSunnyOutlined";
import CloudIcon from "@mui/icons-material/CloudOutlined";
import Icon from "@mdi/react";
import { mdiWaterOutline, mdiWeatherLightningRainy } from "@mdi/js";
import "../css/weathericon.css";

function WeatherIcon(props) {
  const getIcon = (icon) => {
    switch (icon) {
      case "Sunny":
        return (
          <Sunny
            sx={props.size ? { fontSize: props.size } : { fontSize: 100 }}
          ></Sunny>
        );
      case "Cloudy":
        return (
          <CloudIcon
            sx={props.size ? { fontSize: props.size } : { fontSize: 100 }}
          ></CloudIcon>
        );

      case "Rainy":
        return (
          <Icon
            path={mdiWaterOutline}
            size={props.size ? props.size / 25 : 1}
          ></Icon>
        );

      case "Thunderstorm":
        return (
          <Icon
            path={mdiWeatherLightningRainy}
            size={props.size ? props.size / 25 : 1}
          ></Icon>
        );
    }
  };

  return <div className="icon-container">{getIcon(props.type)}</div>;
}

export default WeatherIcon;
