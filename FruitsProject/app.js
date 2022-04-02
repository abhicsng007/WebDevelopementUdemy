const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser:true});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty Solid as a fruit"
});

fruit.save();

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
    
  }
});


