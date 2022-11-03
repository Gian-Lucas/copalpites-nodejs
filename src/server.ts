import { Express, json } from "express";

const express = require("express");
const app: Express = express();
const port = 3333 || process.env.PORT;
const cors = require("cors");

const routes = require("./routes");

app.use(json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
