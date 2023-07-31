const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("../src/db/conn");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const lenderRouter = require("./router/lenderRoute");
const qustionRouter = require("./router/qustionRoute");
const serviceRouter = require("./router/service")

app.use("/api/lender", lenderRouter);
app.use("/api", qustionRouter);
app.use("/api", serviceRouter);

app.listen(PORT, () => {
  console.log(`connection is live at port no. ${PORT}`);
});
