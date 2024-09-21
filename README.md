**⭐️--------------------------BUILD AND RUN EXPRESS-------------------------⭐️**
1. Create a directory and cd into it, ` touch server.js + npm init + code . `

2. Create a basic Express server, installing a express package `npm i express`. Packages added! ✅

3. Built a Basic Structure of Express App (const express = require..., listen port... and etc.)
4. Run the Server : `nodemon`.

**⭐️--------------------------BUILD A LANDING PAGE-------------------------⭐️**
1. Create a landing page using EJS templates. We need to install it: `npm i ejs
`.

2. Build the route. (app.get('/', ... etc)). 🟢server.js

3. Create a views directory and create a ejs file into it: `mkdir views + touch views/index.ejs`. Our landpage will be the `index.ejs` file.

4. Add the boilerplate and content inside. 🟣views

5. Modify the response in the server's route handler usind the `res.render()` method, instead of `res.send()`. So when the user visits the root `/`, they will see our homepage, change it to: `res.render('index.ejs');`. 🟢server

**⭐️-------------------USE MONGOOSE TO CONNECT TO MONGODB ---------------⭐️**

1. We need to install Mongoose and dotenv from NPM: `npm i mongoose dotenv`. Installed! ✅

2. Create a .env file in your project’s root directory: `touch .env`. 
This file will be used to store any sensitive, secret information that the application needs to run, but that we don’t want to commit to GitHub.

3. Create `touch .gitignore` file, and add it to it: `.env`, `node_modules/` and `package-lock.json` .  🔴.gitignore

4. Edit our `.env` file, add a simple list of key-value pairs:  ⚪️.env
```Javascript 
SECRET_NUMBER=13
PASSWORD=12345
```
5. Add a connection string, paste your MongoDB Atlas connection string into your app's `.env` file assigning it to a MONGODB_URI environment variable. ⚪️.env
`MONGODB_URI=mongodb+srv://<username>:<password>@sei.azure.mongodb.net/?retryWrites=true`

6. Name your database collection. You can specify the preferred collection name by adding it between the / and the ? in the connection string: `/fruits?`. You MUST update this this to your preferred collection's name. ⚪️.env

7. Connecting MongoDB in server.js. Require the `dotenv` package at the ***top*** of our server.js file to access them: 🟢server
```Javascript
const dotenv = require("dotenv");
dotenv.config();
``` 

8. Require Mongoose so that we can use it to connect to our database:
`const mongoose = require("mongoose");`

9. We will also add a connection message that will print out our terminal when we've connected to the database. `mongoose.connect()` method:
```Javascript
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
```

10. Start the app: `nodemon`.












**⭐️--------------------------NOTES 📝-------------------------⭐️**
- The server.js file is typically the main entry point and configuration file for setting up an Express web server.

- Use EJS (Embedded JavaScript) templates to create the HTML views for the landing page and other parts of the web application.

- We need to stabilish a connection to a database. This connection will enable our application to store and retrieve data as we develop more features. 
We will use MongoDB Atlas, a cloud database service, along with Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js.



