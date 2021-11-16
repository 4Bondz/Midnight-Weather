import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../css/app.css";
import LargeWeather from "./LargeWeather";
import SmallWeather from "./SmallWeather";
import logo from "../images/midnightweatherlogo.png";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import Slider from "../components/Slider";
import "../css/genericContainer.css";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
      contrastText: "#FFF",
    },
  },
});

function convertToPx(vw, vh) {
  if (vw) {
    return Math.ceil((window.innerWidth * vw) / 100);
  } else if (vh) {
    return Math.ceil((window.innerHeight * vh) / 100);
  } else {
    return 0;
  }
}

function App() {
  const [display, setDisplay] = useState("DAY");
  const [weatherData, setWeatherData] = useState({});
  const timeoutRef = useRef(null);
  const [globalcf, setGlobalcf] = useState("F");

  useEffect(() => {
    async function fetchAPI(lat, lon) {
      await fetch(`/api?lat=${lat}&lon=${lon}`)
        .then((response) => response.json())
        .then(async (data) => {
          setWeatherData(data);
        });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
    } else {
      alert("Geolocation is not supported by this browser");
    }

    function locateSuccess(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      fetchAPI(lat, lon);
    }

    function locateFail(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    }
  }, []);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  let displayObject = {};
  if (display == "DAY") {
    displayObject = (
      <div
        className="weather-holder"
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000}
        >
          {
            <LargeWeather
              weatherData={weatherData.current ? weatherData.current : {}}
              size={{
                height: convertToPx(0, 40),
                width: Math.max(convertToPx(20, 0), 500),
              }}
              key={1}
            ></LargeWeather>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  } else if (display == "WEEK") {
    let mapKeys = [0, 1, 2, 3, 4, 5, 6];
    let today = moment();
    displayObject = (
      <div>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "25px" }}>
              {mapKeys.map((obj, idx) => (
                <SmallWeather
                  key={idx}
                  size={{
                    height: Math.max(convertToPx(0, 25), 250),
                    width: Math.max(convertToPx(12, 0), 100),
                  }}
                  day={moment(today).add(obj, "days").format("dddd")}
                  weatherData={weatherData.daily ? weatherData.daily[obj] : {}}
                  cf={globalcf}
                ></SmallWeather>
              ))}
            </div>
            <div>
              <div
                className="generic-container"
                style={{
                  height: Math.min(convertToPx(6, 0), 100),
                  width: convertToPx(10, 0),
                }}
              >
                <Slider
                  onChange={(val) => {
                    console.log(val);
                    setGlobalcf(val ? "C" : "F");
                  }}
                  size={convertToPx(15, 0) / 8}
                ></Slider>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  } else {
    displayObject = <div></div>;
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (display == "!DAY") {
        console.log("display is day");
        setDisplay("WEEK");
      } else if (display == "!WEEK") {
        console.log("display is week");
        setDisplay("DAY");
      }
    }, 100);
  }, [display]);

  return (
    <div className="container">
      <img src={logo} style={{ width: Math.min(1000, convertToPx(100, 0)) }} />
      <div className="container-spacer">
        <ThemeProvider theme={theme}>
          <MuiButton
            variant={display == "DAY" ? "contained" : "outlined"}
            onClick={() => {
              setDisplay((current) => "!" + current);
            }}
            sx={{
              width: "100%",
              height: "50px",
              fontSize: "25px",
              textTransform: "none",
              fontFamily: "Open Sans, sans-serif",
              boxShadow: "0px 0px 20px 0px #cfc9b3",
            }}
          >
            {display == "DAY" ? "Show 7 Day Forecast" : "Show 1 Day Forecast"}
          </MuiButton>
        </ThemeProvider>
      </div>

      {displayObject}

      {/* {display ? (
        <div>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={true}
            transitionAppearTimeout={1000}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <LargeWeather
                weatherData={weatherData.current ? weatherData.current : {}}
                size={{ height: convertToPx(18, 0), width: convertToPx(0, 32) }}
                key={1}
              ></LargeWeather>
              <LargeWeather
                weatherData={weatherData.current ? weatherData.current : {}}
                size={{ height: convertToPx(18, 0), width: convertToPx(0, 32) }}
                key={2}
              ></LargeWeather>
              <LargeWeather
                weatherData={weatherData.current ? weatherData.current : {}}
                size={{ height: convertToPx(18, 0), width: convertToPx(0, 32) }}
                key={3}
              ></LargeWeather>
              <LargeWeather
                weatherData={weatherData.current ? weatherData.current : {}}
                size={{ height: convertToPx(18, 0), width: convertToPx(0, 32) }}
                key={4}
              ></LargeWeather>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      ) : (
        <div
          className="weather-holder"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={true}
            transitionAppearTimeout={1000}
          >
            {
              <LargeWeather
                weatherData={weatherData.current ? weatherData.current : {}}
                size={{ height: convertToPx(18, 0), width: convertToPx(0, 32) }}
                key={1}
              ></LargeWeather>
            }
          </ReactCSSTransitionGroup>
        </div>
      )} */}
      {/* {arr.map((obj, v) => {
        // return <LargeWeather key={v}></LargeWeather>;
        return (
          <div
            style={{
              position: "absolute",
              left: obj.left,
              top: obj.top,
            }}
          >
            <img height={50} src={bullet} />
          </div>
        );
      })}
      <div
        style={{
          visibility: "invisible",
          position: "absolute",
          left: "10000px",
        }}
      >
        <iframe
          width="1000"
          height="1000"
          src="https://www.youtube.com/embed/jHWhYnwNnfo?autoplay=1&loop=1&playlist=jHWhYnwNnfo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay="1"
        ></iframe>
      </div> */}
    </div>
  );
}

export default App;
