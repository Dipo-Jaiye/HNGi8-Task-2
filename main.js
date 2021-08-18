const express = require("express");
const homeController = require("./controllers/homeController");
const contactController = require("./controllers/contactController");
const layouts = require("express-ejs-layouts");
const {port, PORT} = require("./config");

// Initialize the app
const app = express();

// Apply configuration middleware
const appPort = port || PORT || 3000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(layouts);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Index route
app.get("/", homeController);

// POST route to process form data
app.post("/contact", contactController);

// Start the server listening on the specified port
app.listen(appPort,()=>console.log(`App running on port ${appPort}`));