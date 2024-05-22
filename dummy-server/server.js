const express = require("express"); // to create express app
const { MongoClient } = require("mongodb");
const morgan = require("morgan"); // to log requests to console
const bodyparser = require("body-parser"); // to parse request body
const cors = require("cors"); // to allow requests from different origin (frontend) to access backend api (backend)
const { readdirSync } = require("fs"); // to read files from directory
const { Connection } = require("./config/config");
require("dotenv").config(); // to use .env file to store environment variables like database url, port number, token secret etc.

const app = express(); // create express app and store it in app variable
app.use(
  cors({
    origin: ["*"],
  }) // allow requests from different origin (frontend) to access backend api (backend)
);

app.use(express.static("files")); // to serve static files from files directory
app.use(express.json({ limit: "25mb" })); // to parse json data from request body
app.use(express.urlencoded({ limit: "25mb" })); // to parse url encoded data from request body
app.use(bodyparser.json({ limit: "50mb" })); // to parse json data from request body
app.use(
    bodyparser.urlencoded({
      extended: true,
      parameterLimit: 100000,
      limit: "1000kb",
    })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

// database connection
Connection.open();

const PORT = process.env.PORT || 6000; // use port number from .env file or use 2000 as default port number
app.listen(PORT, () => {
  // start the server
  console.log(`server is running on port ${PORT}`);
});

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r))); // read all the files from routes directory and use them as middlewares

app.get("/api", (req, res) => {
  // create a route to test if server is running or not
  return res.json({
    // send json response
    data: "hey you hit dummy server api",
  });
});
