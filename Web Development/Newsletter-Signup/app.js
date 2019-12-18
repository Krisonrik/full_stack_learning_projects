const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, rsp) => {
  rsp.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, rsp) => {
  var body = req.body;
  var firstName = body.fName;
  var lastName = body.lName;
  var email = body.email;

  var options = {
    url: "https://usX.api.mailchimp.com/3.0/lists/4a6c0de3a9",
    method: "POST"
  };
  request(options, (error, responds, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(responds.statusCode);
    }
  });
  // console.log(body);
});

app.listen("3000", (req, rsp) => {
  console.log("Server listening to port 3000");
});

// API Key
//45518cfba8a2af15ac13110a7135b36a-us4

//List ID
//4a6c0de3a9
