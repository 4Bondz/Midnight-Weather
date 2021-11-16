var express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

var app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/api", async (req, res) => {
  console.log(req.query);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (process.env.DEBUG) {
        console.log(data);
      }
      res.send(data);
    });
});

console.log(`Server Listening at port ${process.env.PORT || 3000}`);
app.listen(process.env.PORT || 3000);
