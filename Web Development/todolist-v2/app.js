const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
mongoose.connect(
  "mongodb+srv://Krisonrik:Codepassion823@cluster0-jf4cu.mongodb.net/todolistDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    console.log(err);
  }
);

// let connection = mongoose.connection;
// if (!connection) {
//   console.log("Failed to connect to database!");
// } else {
//   console.log("Successfully connected to database!");
// }

mongoose.pluralize(null);

const modelHolder = {};

const tasksSchema = {
  task: { type: String, required: true, min: 1, max: 255 }
};

const DefaultTasks = mongoose.model("default", tasksSchema);
modelHolder["default"] = DefaultTasks;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let dayOfWeek = date.getDate();

  // mongoose.connect("mongodb://localhost:27017/todolistDB", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  DefaultTasks.find((err, rslt) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        kindOfDay: dayOfWeek,
        listName: "default",
        newListItems: rslt
      });
    }
    // mongoose.disconnect();
  });
});

app.get("/:param", (req, res) => {
  let dayOfWeek = date.getDate();
  let listName = _.lowerCase(req.params.param);
  if (listName == "about") {
    res.render("about");
  } else {
    // mongoose.connect("mongodb://localhost:27017/todolistDB", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    let CurModel;
    if (modelHolder.hasOwnProperty(listName)) {
      CurModel = modelHolder[listName];
    } else {
      CurModel = mongoose.model(listName, tasksSchema);
      modelHolder[listName] = CurModel;
    }
    CurModel.find((err, rslt) => {
      if (err) {
        console.log(err);
      } else {
        res.render("list", {
          kindOfDay: dayOfWeek,
          listName: listName,
          newListItems: rslt
        });
      }
      // mongoose.disconnect();
    });
  }
});

app.post("/", (req, res) => {
  let listName = req.body.listButtonName;
  console.log(listName);
  console.log(req.body.newItem);

  let CurModel = modelHolder[listName];
  let newTask = new CurModel({
    task: req.body.newItem
  });
  newTask.save();
  // mongoose.disconnect();
  res.redirect("/" + listName);
  console.log("completed adding");
});

app.post("/delete", (req, res) => {
  let listName = req.body.listName;
  let id = req.body.checkbox;
  console.log(listName);
  console.log(id);
  modelHolder[listName].deleteOne({ _id: id }, () => {
    res.redirect("/" + listName);
  });
});

app.listen(process.env.PORT || 3000, (error, responds, body) => {
  console.log("Server started");
});
