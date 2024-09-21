//**-----------------------Build and run Express-------------------------------**
//Here is where we import the modules 
//We begin by loading Express
const express = require('express');

const app = express();

//**----------------------Build the route using EJS templates-------------------**
//GET
app.get('/', async (req, res) => {
    res.render('index.ejs');
});
















app.listen(3000, () => {
    console.log('Listening on port 3000');
});