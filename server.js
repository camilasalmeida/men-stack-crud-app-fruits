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
    res.redirect("/fruits");                  // redirect to index fruits
  });

  

//**----------------------7. Build the Fruits Index Page ----------------------**
//This route will retrieve and display all the fruits currently stored in our database.
//GET /fruits
//Retrieve data from the database using .find() method.
//We’ve modified our route to be an asynchronous function. This allows us to use the await keyword to wait for .find() to complete its operation and assign the result to the allFruits variable.
//we used res.render() to pass the fruits data from our database to the EJS file. By passing { fruits: allFruits }, we made the allFruits array accessible in our EJS file as a variable named fruits.
app.get('/fruits', async (req,res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits);                       //To be sure we have the data we are looking for, let’s log allFruits to the console.
    res.render("fruits/index.ejs", { fruits: allFruits }); 
});









app.listen(3000, () => {
    console.log('Listening on port 3000');
})
