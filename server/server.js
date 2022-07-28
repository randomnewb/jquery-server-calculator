const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

let calculationListArray = [];

app.post("/calculation", (req, res) => {
  const calculation = req.body;

  let computation = 0;
  let symbol = "";

  calculation.inputOne = parseInt(calculation.inputOne);
  calculation.inputTwo = parseInt(calculation.inputTwo);

  if (calculation.expression === "addition") {
    calculation.computation = calculation.inputOne + calculation.inputTwo;
    calculation.symbol = "+";
  } else if (calculation.expression === "subtraction") {
    calculation.computation = calculation.inputOne - calculation.inputTwo;
    calculation.symbol = "-";
  } else if (calculation.expression === "multiplication") {
    calculation.computation = calculation.inputOne * calculation.inputTwo;
    calculation.symbol = "*";
  } else if (calculation.expression === "division") {
    calculation.computation = calculation.inputOne / calculation.inputTwo;
    calculation.symbol = "/";
  }

  calculationListArray.push(calculation);
  res.send(calculation);
  // res.sendStatus(201);
});

app.get("/calculation", (req, res) => {
  res.send(calculationListArray);
});

app.post("/delete", (req, res) => {
    calculationListArray = [];
    res.send(calculationListArray);
})

app.listen(port, () => {
  console.log("listening on port", port);
});
