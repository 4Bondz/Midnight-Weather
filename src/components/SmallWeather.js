import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import TemperatureDisplay from "./TemperatureDisplay";
import WeatherIcon from "./WeatherIcon";
import "../css/smallWeather.css";

/*
_____________
|  <day >   | 
|           | 
|  <icon>   |
|           |
|  <temp>   |
|           |
‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

function SmallWeather(props) {
  const convertToC = (t) => {
    if (t === undefined) {
      return "N/A";
    } else {
      console.log(t);
      return Math.round(parseFloat(t) - 273.15);
    }
  };
  const convertToF = (t) => {
    if (t === undefined) {
      return "N/A";
    } else {
      // t (temp) can either be an object or a single number from api
      return Math.round(((parseFloat(t) - 273.15) * 9) / 5 + 32);
    }
  };

  const getIconFromProps = (p) => {
    if (p === undefined) {
      return "Sunny"; // default to sunny
    }
    switch (
      p // Custom re-mapping from our API categories to actual weather icon categories. It's not 1:1
    ) {
      case "Clouds":
      case "Atmosphere":
        return "Cloudy";

      case "Clear":
        return "Sunny";

      case "Rain":
      case "Drizzle":
        return "Rainy";

      case "Thunderstorm":
        return "Thunderstorm";
    }
  };

  console.log(props.weatherData);
  return (
    <div
      className="small-weather-container"
      style={{
        height: props.size.height,
        width: props.size.width,
        fontSize: props.size.width / 8,
      }}
    >
      <div className="day" style={{ fontSize: props.size.width / 7 }}>
        {props.day}
      </div>
      <WeatherIcon
        type={getIconFromProps(
          props.weatherData.weather
            ? props.weatherData.weather[0].main
            : undefined
        )}
        size={Math.min(props.size.height, props.size.width) / 2}
      ></WeatherIcon>
      <TemperatureDisplay
        size={Math.min(props.size.height, props.size.width) / 5}
        temperature={
          props.cf == "F"
            ? convertToF(
                props.weatherData.temp ? props.weatherData.temp.day : undefined
              )
            : convertToC(
                props.weatherData.temp ? props.weatherData.temp.day : undefined
              )
        }
        cf={props.cf}
      ></TemperatureDisplay>
    </div>
  );
}

export default SmallWeather;
