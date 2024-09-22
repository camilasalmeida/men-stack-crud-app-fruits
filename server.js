//**-----------------------Build and run Express-------------------------------**
//**--------------Require the dotenv package, It should always be on the first line-----------------------------**

const dotenv = require('dotenv') //require package
dotenv.config();                 //loads the environment variables from .env file. You can also use: `require('dotenv').config() .

//Here is where we import the modules 
//We begin by loading Express
const express = require('express');
const mongoose = require('mongoose'); 

const app = express();


//**----------------------2. Use Mongoose to connect to MongoDB-------------------**

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to to MongoDB ${mongoose.connection.name}`);
});

//**----------------------3. Import the model into server.js ----------------------**

const Fruit = require("./models/fruit.js");    //path


//**----------------------5. Adding the Middleware ----------------------**

app.use(express.urlencoded({ extended: false }));


//**----------------------1. Build the route using EJS templates-------------------**
//GET
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

//**----------------------4. Create the NEW Route for Creating a new fruit ----------------------**

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
});


//**----------------------6. Define the route FRUITS- POST ----------------------**
// POST /fruits: signifies the creation of new data.
app.post("/fruits", async (req, res) => {
    //console.log(req.body);
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    //console.log(req.body);
    res.redirect("/fruits/new");
  });


app.listen(3000, () => {
    console.log('Listening on port 3000');
})
