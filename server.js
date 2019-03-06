// Require Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

// Set up port
const PORT = process.env.PORT || 3000;

// Initializing express
const app = express();

// Serve static public folder
app.use(express.static("public"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongo connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/espnScraper";
mongoose.connect(MONGODB_URI);

// Require and use all routes
require("./routes/exphbsRoutes")(app);
require("./routes/espnScrapeRoutes")(app);

// Listener
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
})