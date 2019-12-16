const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, rsp) {
  rsp.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, rsp) {
  var val1 = parseInt(req.body.num1);
  var val2 = parseInt(req.body.num2);
  var rslt = String(val1 + val2);
  rsp.send(rslt);
});

app.get("/bmicalculator", function(req, rsp) {
  rsp.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, rsp) {
  console.log(req.body);
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var rslt = weight / Math.pow(height, 2);
  console.log(rslt);
  rsp.send("Your BMI is " + rslt);
});

app.listen("3000", function() {
  console.log("calculator sever listening to port 3000 ");
});
