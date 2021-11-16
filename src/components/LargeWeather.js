import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import TemperatureDisplay from "./TemperatureDisplay";
import WeatherIcon from "./WeatherIcon";
import DailyForecastRing from "./DailyForecastRing";
import "../css/largeWeather.css";

function LargeWeather(props) {
  const [tempUnit, setTempUnit] = useState("F");

  console.log(`props: ${JSON.stringify(props)}`);

  useEffect(() => {
    console.log("TEMPUNIT:", tempUnit);
  }, [tempUnit]);

  const convertToC = (t) => {
    if (t === undefined) {
      return "N/A";
    } else if (typeof t == "number") {
      return Math.round(parseFloat(t) - 273.15);
    } else {
      return Math.round(parseFloat(t.day) - 273.15);
    }
  };
  const convertToF = (t) => {
    if (t === undefined) {
      return "N/A";
    } else if (typeof t == "number") {
      // t (temp) can either be an object or a single number from api
      return Math.round(((parseFloat(t) - 273.15) * 9) / 5 + 32);
    } else {
      return Math.round(((parseFloat(t.day) - 273.15) * 9) / 5 + 32);
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

  return (
    // <DailyForecastRing>
    <div
      className="large-weather-container"
      style={{
        height: props.size.height,
        width: props.size.width,
        fontSize: props.size.width / 8,
      }}
    >
      <WeatherIcon
        type={getIconFromProps(
          props.weatherData.weather
            ? props.weatherData.weather[0].main
            : undefined
        )}
        size={Math.min(props.size.height, props.size.width) / 2.5}
      ></WeatherIcon>

      <TemperatureDisplay
        size={Math.min(props.size.height, props.size.width) / 5}
        temperature={
          tempUnit == "F"
            ? convertToF(props.weatherData.temp)
            : convertToC(props.weatherData.temp)
        }
        cf={tempUnit}
      ></TemperatureDisplay>

      {props.hideSlider ? (
        <div></div>
      ) : (
        <Slider
          onChange={(val) => {
            console.log(val);
            //recalculateTemperature(tempUnit);
            setTempUnit(val ? "C" : "F");
          }}
          size={Math.min(props.size.height, props.size.width) / 12}
        ></Slider>
      )}
    </div>
    // </DailyForecastRing>
  );
}

export default LargeWeather;
