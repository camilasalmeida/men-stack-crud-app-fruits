### ** ----------------------------- **BUILD AND RUN EXPRESS** ---------------------------**
1. Create a directory and cd into it, ` touch server.js + npm init + code . `
2. Create a basic Express server, installing a express package `npm i express`. Packages added! ✅
3. Built a Basic Structure of Express App (const express = require..., listen port... and etc.)
4. Run the Server : `nodemon`.

### ** ----------------------------- **BUILD A LANDING PAGE** -----------------------------**
1. Create a landing page using EJS templates. We need to install it: `npm i ejs
`.
2. Build the route. (app.get('/', ... etc)). 🟢server.js
3. Create a views directory and create a ejs file into it: `mkdir views + touch views/index.ejs`. Our landpage will be the `index.ejs` file.
4. Add the boilerplate and content inside. 🟣views
5. Modify the response in the server's route handler usind the `res.render()` method, instead of `res.send()`. So when the user visits the root `/`, they will see our homepage, change it to: `res.render('index.ejs');`. 🟢server.js

### ** ------------------- **USE MONGOOSE TO CONNECT TO MONGODB** -------------------**

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
7. Connecting MongoDB in server.js. Require the `dotenv` package at the ***top*** of our server.js file to access them: 🟢server.js
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

### ** ------------------ **BUILD THE FRUIT MODEL** ---------------------**

1. Create a Models Directory and a Fruit file: `mkdir models + touch models/fruit.js`
2. Create a Schema and Model for Our Fruits:
   1. Create the schema.
   2. Link the schema to a model.
   3. Export the model. `module.exports = Fruit;`
 You should name models and model files singularly. 🟠models/fruits.js
3. Import the model into server.js, `const Fruit = require("./models/fruit.js");`  🟢server.js

### ** -------- **BUILD THE NEW FRUIT PAGE (DISPLAY A FORM)** -----------**

1. Define the route and test it: `app.get("/fruits/new", (req, res) => {
  res.send("This route sends the user a form page!");
});` 🟢server.js
2. Create the new template: `mkdir views/fruits + touch views/fruits/new.ejs`.
3. Add some basic content to our `new.ejs` template. 🟠models/fruits/new.ejs
4. Update the route in server.js: Instead of res.send, let’s render the new.ejs. `res.render("fruits/new.ejs");` 🟢server.js 
5. Create the form. This form will allow users to input data for creating a new fruit. 🟠models/fruits/new.ejs

### ** ---------- **CREATE A FRUIT - CRUD operation, CREATE!** -----------**
1. Right after importing the Fruit model, create a route to handle form submissions for creating new fruits in our database. `app.use(express.urlencoded({ extended: false }));` 🟢server.js
2. Define and test the route. `app.post("/fruits", async (req, res) => {
  console.log(req.body);
  res.redirect("/fruits/new");
}); ` 🟢server.js
3. Add the logic to the checkbox: `if (req.body.isReadyToEat === "on")` 🟢server.js
4. Verify that our data is safe by navigating to the MongoDB Atlas dashboard.

### ** ----- **BUILD THE FRUITS INDEX PAGE - CRUD funcionality, READ!** -----**
This route will retrieve and DISPLAY all the fruits currently stored in our database.

1. Define and test the route. `app.get("/fruits", (req, res) => {
  res.send("Welcome to the index page!");
});`  🟢server.js
2. Retrieve data from the database. Use Mongoose’s .find() method, When called without any arguments, .find() retrieves all documents within a collection, returning them as an array.
```Javascript
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.send("Welcome to the index page!");
}); 
```
3. Log the variable `allFruits` to the console, to be sure we have the data we're looking for. Nagivate to localhost. 🟢server.js
4. Update the route, display this data to the user. Instead of .send(), we will use .render() to respond with a dynamically generated HTML view. The .render() method takes two arguments: 
    1. The first argument is a string specifying the path to the EJS template we wish to render: `‘fruits/index.ejs’`.
    2. The second argument is an object containing the data we want to pass to the template. This data is provided as key/value pairs, where the key is the name we’ll use to reference the data in our EJS template.
    `res.render("fruits/index.ejs", { fruits: allFruits });` 🟢server.js
5. Create the index template inside of views. `touch views/fruits/index.ejs` 
6. Add HTML boilerplate and content. 🟣views/fruits/index.js
7. List our fruits in a simple, bulleted list format using an unordered list <ul>. Do this by looping over the fruits array and dynamically generating an <li> for each fruit’s name. 🟣views/fruits/index.js
8. Refresh localhost.
9. Update our create route. Instead of redirecting users back to the form after adding a new fruit, we can redirect them to the index page. 🟢server.js
10. Adding links. Add a link on the homepage of our application that users can click to visit the index page: 
    1. `<a href="/fruits">Browse Fruits</a>` . 🟣views/index.ejs
    2. `<a href="/fruits/new">Add New Fruit</a>`  🟣views/fruits/index.ejs
    3. `<a href="/fruits/">Back to Fruits</a> ` 🟣views/fruits/new.ejs

### ** ------- **BUILD THE FRUITS SHOW PAGE - CRUD operation, READ!** ---------**
The show route is designed to display detailed information about a specific item, such as a specific `fruit` in our application. In keeping with RESTful routing conventions, the url for this route will be: :fruitId. 
The `:fruitId` in the URL is a variable segment, known as a URL parameter. It allows our route to dynamically handle requests for different fruits by their unique IDs. So, whenever a user wants to view details about a particular fruit, they will navigate to a URL like /fruits/12345, where 12345 is the fruit’s ID.
1. Transform the fruit names listed into clickable links. Wrap the `<%= fruit.name %>` with an <a> tag: `<li><a href="#"><%= fruit.name %></a></li>`.  🟣views/fruits/index.ejs
2. Adding a dynamic href. Access their id's by using `fruit._id`: `<a href="/fruits/<%= fruit._id %>"> <%= fruit.name %> </a>`. 🟣views/fruits/index.ejs
3. Go the browser and test a link by clicking in any fruit. It shows the fruit's id, but the route does not exist, we haven’t built it yet.
4. Define and test the `show` route: 
```Javascript
app.get("/fruits/:fruitId", (req, res) => {
  res.send(
    `This route renders the show page for fruit id: ${req.params.fruitId}!`
  );
});
``` 
Add it below the fruits/new route! We need to ensure that any route with an /:id is placed after /new in our express applications. 🟢server.js

5. Build the READ functionality. Use Mongoose’s `.findById()` method for fetching a specific fruit by its _id. This method is perfect for retrieving a single document based on its unique identifier. ` const foundFruit = await Fruit.findById(req.params.fruitId);`. Update the route:
```Javascript
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.send(`This route renders the show page for fruit id: ${req.params.fruitId}!`);
});
``` 
6. Rendering the Fruit details. Update from res.send() to res.render() to display the show page template. Also pass the retrieved fruit data to the template: `res.render("fruits/show.ejs", { fruit: foundFruit });`. 🟢server.js
7. Create the SHOW template: `touch views/fruits/show.ejs`. Add boilerplate and content. 🟣views/fruits/show.ejs
8. Enhance our application to show detailed information about each fruit. Dynamically update our HTML template using the fruit data we’ve passed: `<title><%= fruit.name %></title>` and `<h1><%= fruit.name %></h1>`.
Teste it! 🟣views/fruits/show.ejs
9. Incorporate conditional rendering based on the fruit’s `isReadyToEat` property. This will display different messages depending on whether the fruit is ready to eat or not. Use EJS control flow to dynamically display a message about the fruit’s readiness. Insert an if/else statement: `<% if (fruit.isReadyToEat) { %>` ... 🟣views/fruits/show.ejs
10. Link show page back to Fruits index. Navigate back to the index page: `<a href="/fruits/">Back to Fruits</a>`. 🟣views/fruits/show.ejs
11. Test it! Done ✅

### ** ------ **DELETE A FRUIT - CRUD operation - DELETE!** -------**
1. Introduce two essential middleware components: method-override and morgan.
Stop our server and install their node packages: `npm i method-override morgan.
2. Require them at the top of our server.js. 🟢server.js
3. Add it along with the others middlewares: `app.use(methodOverride("_method"));` and `app.use(morgan("dev"));`. 🟢server.js
4. Create the UI to delete a fruit. Adjust our fruits show page to include a button for deleting a fruit. 🟣views/fruits/show.ejs
```Javascript
<form action="/fruits/<%=fruit._id%>?_method=DELETE" method="POST">
  <button type="submit">Delete <%= fruit.name %></button>
</form>
<a href="/fruits">Back to Fruits</a>
```
5. Define and test the route. Build and test the delete functionality in stages, first create a basic route that sends a confirmation message. Then, refactor it to add the actual delete functionality: `app.delete("/fruits/:fruitId", (req, res) => {`. 🟢server.js
6. Create delete funcionality. Use the Mongoose method findByIdAndDelete() to find the fruit by its ID and delete it: `await Fruit.findByIdAndDelete(req.params.fruitId);`. 🟢server.js
7. Redirects the user back to the index page /fruits, where the deleted fruit will no longer be listed. 🟢server.js

### ** ------ **BUILD THE EDIT ROUTE - CRUD operation - EDIT!** -------**
This is the only RESTful route that contains three segments /fruits/:fruitId/edit.
1. Add a link on the show page and Update `show.ejs`. 🟣views/fruits/show.ejs
```Javascript
<a href="/fruits/<%= fruit._id %>/edit">Edit <%= fruit.name %></a>
<a href="/fruits">Back to Fruits</a>
``` 
2. Define the route. 
```Javascript
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});
```
3. Create the edit template.  Create a edit.ejs template inside the views/fruits: `touch views/fruits/edit.ejs
`. 🟣views/fruits/show.ejs
4. Edit fruit data. 🟣views/fruits/show.ejs
5 . Prefill the form with the current data of the fruit being edited: `<input type="checkbox" name="isReadyToEat" <% if (fruit.isReadyToEat) { %>checked<% } %> >` 🟣views/fruits/show.ejs

### ** ---- **UPDATE A FRUIT - CRUD operation - UPDATE!** ---------------**
The update route is responsible for processing the data submitted from the edit form and applying those changes to the corresponding item in the database.
2. Create update route. This route will handle PUT requests sent from the edit form on the Edit page.


### **⭐️-------------------------NOTES 📝-----------------------------⭐️**
- The server.js file is typically the main entry point and configuration file for setting up an Express web server.

- Use EJS (Embedded JavaScript) templates to create the HTML views for the landing page and other parts of the web application.

- We need to stabilish a connection to a database. This connection will enable our application to store and retrieve data as we develop more features. 
We will use MongoDB Atlas, a cloud database service, along with Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js.

- Creating a Model: As we progress with our application, the next essential step is to create a schema and model for our fruits. This process will define how our fruit data is structured and stored in the database. By establishing a clear schema, we ensure consistency and reliability in the data we handle. Additionally, the model created from this schema will serve as the main interface for our application to interact with the MongoDB database, allowing us to perform CRUD operations on fruit data.

- The NEW Route: Creating a new fruit in our application involves two distinct steps, each handled by separate routes. The first step is presenting the user with a form to enter fruit data. This is the responsibility of the “new” route, which we’ll build in this section. Its sole purpose is to display a form for data entry.
Once the user fills out the form and submits it, the data is sent to another route, which we’ll construct in the next section. This second route is dedicated to processing the submitted data and inserting it into the database.

Organizing our templates into model-specific sub-folders is a good practice, especially for larger applications with multiple models.

- When a user submits the form on the /fruits/new page, the browser sends a request to our server with the form data. To access this data in Express, we need to use middleware. Specifically, we’ll use express.urlencoded. 

- Middleware **express.urlencoded**: This middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object. It then attaches this object to the `req.body` property of the request, making the form data easily accessible within our route handlers.
 
 - Middleware **method-override**: Tricks our express app into thinking that we’ve made PUT and DELETE requests from the browser. By doing this, we’re able to stick to our routing conventions, while at the same time, behind the scenes, using HTTP methods that the browser supports. 

 - Middleware **morgan**: Serves as a logging tool for our HTTP requests, providing valuable insights into application behavior.


-  1. `req` is the request object that contains information about the HTTP request.
   2.  `params` is an object within the request object that holds ***route*** parameters. These are the parts of the URL that are defined with a colon(:) in the route path.
    3. Using fruitId: `req.params.fruitId` retrieves the value of fruitId from the URL. For example, if the URL is /fruits/12345, then req.params.fruitId will equal 12345.
    This ID is then used in the `Fruit.findById(req.params.fruitId)` call to search for the specific fruit in the database.
