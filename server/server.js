const express = require("express");
const dbConnection = require("./config/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dbConnection.on("error", console.error.bind(console, "connection error!"));
dbConnection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
});
