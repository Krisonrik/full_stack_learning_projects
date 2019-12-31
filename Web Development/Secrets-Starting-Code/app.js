require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  "mongodb://localhost:27017/userDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userId: String
});

const secretSchema = new mongoose.Schema({
  secret: { type: String, required: true }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("Users", userSchema);
const Secret = new mongoose.model("Secrets", secretSchema);

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ userId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ userId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.route("/").get((req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    req.login(
      new User({ username: req.body.username, password: req.body.password }),
      err => {
        if (err) {
          console.log(err);
          res.redirect("/login");
        } else {
          res.render("secrets");
        }
      }
    );
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    User.register(
      { username: req.body.username },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, respond, () => {
            res.redirect("/secrets");
          });
        }
      }
    );
  });

app.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  })
);

app
  .route("/auth/google/secrets")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/secrets");
    }
  );

app.route("/auth/facebook").get(passport.authenticate("facebook"));

app.route("/auth/facebook/secrets").get(
  passport.authenticate("facebook", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  })
);

app.route("/secrets").get((req, res) => {
  if (req.isAuthenticated()) {
    Secret.find((err, rslt) => {
      if (err) {
        res.send(err);
      } else {
        res.render("secrets", { secrets: rslt });
      }
    });
  } else {
    res.redirect("/login");
  }
});

app
  .route("/submit")
  .get((req, res) => {
    res.render("submit");
  })
  .post((req, res) => {
    let newSecret = new Secret({ secret: req.body.secret });
    newSecret.save();
    res.redirect("/secrets");
  });

app.route("/logout").get((req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, (error, responds, body) => {
  console.log("Server started");
});
