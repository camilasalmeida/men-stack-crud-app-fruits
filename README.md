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

5. Modify the response in the server's route handler usind the `res.render()` method, instead of `res.send()`. So when the user visits the root `/`, they will see our homepage. (`res.render('index.ejs');`) 🟢server





**⭐️--------------------------NOTES 📝-------------------------⭐️**
- The server.js file is typically the main entry point and configuration file for setting up an Express web server.
- Use EJS (Embedded JavaScript) templates to create the HTML views for the landing page and other parts of the web application.


