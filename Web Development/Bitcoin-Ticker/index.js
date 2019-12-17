const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

var rslt;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, rsp) => {
  rsp.sendFile(__dirname + "/index.html");
});

app.post("/", (req, rsp) => {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  var option = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: { from: crypto, to: fiat, amount: amount }
  };
  //   console.log(option);
  request(option, function(err, db_rsp, body) {
    if (console.log(err) == null) {
      // console.log(db_rsp);
      if (db_rsp.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(data.price);
        rsp.send(
          "<h1>" +
            "The price of " +
            amount +
            " " +
            crypto +
            " is " +
            String(data.price) +
            fiat +
            "</h1>"
        );
      }
    }
  });
});

app.listen("3000", () => {
  console.log("Server is running on port 3000");
});
