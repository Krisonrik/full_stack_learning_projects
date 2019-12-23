const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lowdash");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb://localhost:27017/wikiDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

const articleSchema = {
  title: { type: String, minLength: 1, required: true },
  content: { type: String, minLength: 1, required: true }
};
mongoose.pluralize(null);
const Article = mongoose.model("articles", articleSchema);

app
  .route("/articles")
  .get((req, res) => {
    Article.find((err, rslt) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rslt);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save((err, rslt) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Successfully added a new article.");
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany(err => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all articles.");
      }
    });
  });

app
  .route("/articles/:articleName")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleName }, (err, rslt) => {
      if (err) {
        res.send(err);
      } else {
        if (rslt) {
          res.send(rslt);
        } else {
          res.send("No article found");
        }
      }
    });
  })
  .put((req, res) => {
    Article.update(
      { title: req.params.articleName },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err, rslt) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  })
  .patch((req, res) => {
    Article.update(
      { title: req.params.articleName },
      { $set: req.body },
      (err, rslt) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully updated article.");
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleName }, (err, rslt) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted article.");
      }
    });
  });

app.listen(process.env.PORT || 3000, (error, responds, body) => {
  if (error) {
    console.log(error);
  }
  console.log("Server started");
});
