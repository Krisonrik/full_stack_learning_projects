require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(
  "mongodb://localhost:27017/userDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({ email: String, password: String });
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = new mongoose.model("Users", userSchema);

app.route("/").get((req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    let username = req.body.username;
    let password = md5(req.body.password);
    // console.log(username);
    // console.log(password);

    User.findOne({ email: username }, (err, rslt) => {
      if (err) {
        res.send(err);
      } else {
        if (rslt) {
          if (rslt.password === password) {
            res.render("secrets");
          } else {
            res.send("Wrong username or password!");
          }
        } else {
          res.send("Username doesn't exist!");
        }
      }
    });
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password)
    });
    newUser.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.render("secrets");
      }
    });
  });

app.route("/logout").get((req, res) => {
  res.render("home");
});

app.listen(process.env.PORT || 3000, (error, responds, body) => {
  console.log("Server started");
});
