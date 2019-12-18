const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, rsp) => {
  rsp.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, rsp) => {
  var body = req.body;
  var firstName = body.fName;
  var lastName = body.lName;
  var email = body.email;

  var data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {FNAME: firstName, LNAME: lastName}
    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: 'https://us4.api.mailchimp.com/3.0/lists/4a6c0de3a9',
    method: 'POST',
    headers: {'Authorization': 'richard 45518cfba8a2af15ac13110a7135b36a-us4'},
    body: jsonData
  };

  request(options, (error, responds, body) => {
    if (error) {
      console.log(error);
      rsp.sendFile(__dirname + '/failure.html');
    } else {
      if (responds.statusCode != 200) {
        console.log(responds.statusCode);
        console.log(responds.statusMessage);
        rsp.sendFile(__dirname + '/failure.html');
      } else {
        rsp.sendFile(__dirname + '/success.html');
      }
    }
  });
});

app.post('/failure', (req, rsp) => {
  rsp.sendFile(__dirname + '/signup.html');
})

app.listen(process.env.PORT || 3000, (req, rsp) => {
  console.log('Server listening to port 3000');
});

// API Key
// 45518cfba8a2af15ac13110a7135b36a-us4

// List ID
// 4a6c0de3a9
