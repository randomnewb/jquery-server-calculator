const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('server/public'));
app.use(express.urlencoded({extended:true}))

app.get('/calculation', (req, res) => {
    res.send(calculation);
});

app.post('/calculation', (req, res) => {
    const calculation = req.body;
    
    let computation = 0;

    calculation.inputOne = parseInt(calculation.inputOne);
    calculation.inputTwo = parseInt(calculation.inputTwo);

    if (calculation.expression === "addition") {
        calculation.computation = calculation.inputOne + calculation.inputTwo;
    } else if (calculation.expression === "subtraction") {
        calculation.computation = calculation.inputOne - calculation.inputTwo;
    } else if (calculation.expression === "multiplication") {
        calculation.computation = calculation.inputOne * calculation.inputTwo;
    } else if (calculation.expression === "division") {
        calculation.computation = calculation.inputOne / calculation.inputTwo;
    }

    res.send(calculation);
    res.sendStatus(201);
});

app.listen(port, () => {
    console.log('listening on port', port);
});