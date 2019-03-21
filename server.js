var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

/*******Configure middleware********/
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/testScrapeDB", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testScrapeDB";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

/*******Routes********/
var apiRoutes = require("./controllers/api-routes.js");
var viewRoutes = require("./controllers/views-routes.js");

app.use(apiRoutes);
app.use(viewRoutes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
