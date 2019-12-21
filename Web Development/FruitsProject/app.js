const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const pplSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, min: 1, max: 150 },
//   favoriteFruit: fruitSchema
// });

// let Person = mongoose.model("Person", pplSchema);

// Person.updateOne({ name: "John Doh" }, { favoriteFruit: orange }, err => {
//   console.log(err);
// });

// let keely = new Person({
//   name: "Keely Stevens",
//   age: 40
// });

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

// Person.insertMany([keely, john, jane, lucy], err => {
//   if (err) {
//     console.log(err);
//   }
//   mongoose.disconnect();
// });

// Person.find((err, people) => {
//   if (err) {
//     console.log(err);
//   } else {
//     people.forEach(val => {
//       console.log(val.name);
//     });
//   }
// });

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10 },
  review: { type: String, maxlength: 255 }
});

let Fruit = mongoose.model("Fruit", fruitSchema);

// let apple = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Decent fruit that last a long time."
// });

// let orange = new Fruit({
//   name: "Orange",
//   rating: 7,
//   review: "Can be sour sometimes, but very juicy."
// });
let orange;

let orangeResult = Fruit.findOne({ name: "Orange" }, err => {
  console.log(err);
});

// let peach = new Fruit({
//   name: "Peach",
//   rating: 6,
//   review: "When it's good, it's juicy."
// });

// Fruit.insertMany([apple, orange, peach], err => {
//   if (err) {
//     console.log(err);
//   }
//   mongoose.disconnect();
// });

// let rslt = Fruit.findOne({ name: "Apple" }, err => {
//   if (err) {
//     console.log(err);
//   }
// });

// rslt.then(value => {
//   mongoose.connection.close();
//   console.log(value);
// });

// Fruit.updateOne({ name: "Peach" }, { review: "Meh!" }, err => {
//   console.log(err);
// });

// let rslt = Fruit.findOne({ name: "Peach" }, err => {
//   if (err) {
//     console.log(err);
//   }
// });

// rslt.then(value => {
//   mongoose.connection.close();
//   console.log(value);
// });

// let poop = new Fruit({ name: "Poop", rating: 1, review: "Run away!" });

// poop.save();

// const rslt = Fruit.remove({ name: "Poop" });
// rslt.then(value => {
//   console.log(value);
//   mongoose.disconnect();
// });

const pplSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 1, max: 150 },
  favoriteFruit: fruitSchema
});

let Person = mongoose.model("Person", pplSchema);

orangeResult.exec((err, res) => {
  if (err) {
    console.log(err);
  } else {
    orange = res;
    console.log(res);
    Person.updateOne({ name: "John Doh" }, { favoriteFruit: orange }, err => {
      console.log(err);
    });

    let rslt = Person.findOne({ name: "John Doh" }, err => {
      console.log(err);
    });

    rslt.exec((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
      mongoose.disconnect();
    });
  }
});
