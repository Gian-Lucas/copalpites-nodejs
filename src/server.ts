import { Express, json } from "express";

const express = require("express");
const app: Express = express();
const port = 3333 || process.env.PORT;
const cors = require("cors");

// const nameRouter = require("./routes/name");

app.use(json());
app.use(cors());

// app.use("/names", nameRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
