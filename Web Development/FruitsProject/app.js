const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const pplSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 1, max: 150 }
});

let Person = mongoose.model("Person", pplSchema);
let keely = new Person({
  name: "Keely",
  age: 40
});

// keely.save();

// let john = new Person({
//   name: "John Doh",
//   age: 37
// });

// let jane = new Person({
//   name: "Jane Doh",
//   age: 56
// });

// let lucy = new Person({
//   name: "Lucy Washington",
//   age: 18
// });

// Person.insertMany([john, jane, lucy], err => {
//   if (err) {
//     console.log(err);
//   }
// });

Person.find((err, people) => {
  if (err) {
    console.log(err);
  } else {
    people.forEach(val => {
      console.log(val.name);
    });
  }
  mongoose.disconnect();
});
