const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
var taskLists = {default: ['Buy Food', 'Cook Food', 'Eat Food']};
// var newItems = ['Buy Food', 'Cook Food', 'Eat Food'];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let today = new Date();
  let options = {weekday: 'long', day: 'numeric', month: 'long'};
  let dayOfWeek = today.toLocaleDateString('en-US', options);
  res.render('list', {
    kindOfDay: dayOfWeek,
    listName: 'default',
    newListItems: taskLists.default
  });
});

app.get('/:param', (req, res) => {
  let today = new Date();
  let options = {weekday: 'long', day: 'numeric', month: 'long'};
  let dayOfWeek = today.toLocaleDateString('en-US', options);
  let listName = req.params.param;
  console.log('inside ' + listName + ' get function');
  console.log(taskLists);
  if (taskLists.hasOwnProperty(listName)) {
    console.log(taskLists.listName);
    res.render('list', {
      kindOfDay: dayOfWeek,
      listName: listName,
      newListItems: taskLists.listName
    });
  } else {
    console.log('new list');
    taskLists.str(listName) = [];
    res.render('list', {
      kindOfDay: dayOfWeek,
      listName: listName,
      newListItems: taskLists.listName
    });
  }
});


app.post('/', (req, res) => {
  console.log(req.body.listButtonName);
  let listName = req.body.listButtonName;
  if (taskLists.hasOwnProperty(listName)) {
    taskLists.listName.push(req.body.newItem);
    res.redirect('/' + listName);
  } else {
    taskLists.listName = [req.body.newItem];
    console.log('adding new list ' + listName);
    console.log(taskLists.listName);
    res.redirect('/' + listName);
  }
});

app.listen(process.env.PORT || 3000, (error, responds, body) => {
  console.log('Server started');
});
