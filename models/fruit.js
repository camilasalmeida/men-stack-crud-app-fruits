//Import our mongoose package
const mongoose = require('mongoose');

//Create a Schema with 2 fields/keys
//Inside of those parentheses we're making an object. That object is going to have our blueprint.
const fruitSchema = new mongoose.Schema({        //making our Schema object. `fruitSchema` is our convention resource schema.
    name: String,
    isReadToEat: Boolean,
})

//We need to compile it, register our model.
const Fruit = mongoose.model('Fruit', fruitSchema)

//with that done, we just need to export it
module.exports = Fruit;


