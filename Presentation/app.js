require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const dummyRoute = require("./routes/_dummy");
const calendarRoute = require("./routes/calendar");
const feedbackRoute = require("./routes/feedback");
const homeRoute = require("./routes/home");
const morgan = require("morgan");
const errorHandler = require("./middleware/error-handler");

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = !!process.env.DEV_ENV;

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    httpOnly: !dev,
  })
);

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./Presentation/views");
app.set("view engine", "pug");

if (dev) {
  app.use("/dummy", dummyRoute);
}

app.use("/calendar", calendarRoute);

app.use("/feedback", feedbackRoute);

app.use("/home", homeRoute);

app.use(errorHandler);

let _handler = (req, res) => {
  return res.status(200).end();
};

const setHandler = (handler) => {
  _handler = handler;
};

app.get("/*", (req, res) => {
  return _handler(req, res);
});

module.exports = {
  app,
  setHandler,
};