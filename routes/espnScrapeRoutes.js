// Require all models
const db = require("../models");
// Require dependencies
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = (app) => {
    // Get route for scraping espn website
    app.get("/scrape", (req, res) => {
        // Use axios to grab espn body of html
        axios.get("http://www.espn.com/").then((response) => {
            // Load html data from axios into cheerio and save it as $ for short
            const $ = cheerio.load(response.data);

            // Use cheerio each method for each article scraped that has an image and summary
            $("article.contentItem").each((i, element) => {
                console.log($(element).children("section").children("a").children("figure").children("picture").children("img").attr("data-default-src"));
                // Save an empty result object    
                const result = {};
                // Add title, summary, image, and href of an article, save them as properties of the result object
                result.title = $(element).children("section").children("a").children("div").children("div").children("h1").text();
                result.summary = $(element).children("section").children("a").children("div").children("div").children("p").text()
                result.link = `http://www.espn.com${$(element).children("section").children("a").attr("href")}`;
                result.image = $(element).children("section").children("a").children("figure").children("picture").children("img").attr("data-default-src");
                // Make sure there is a title and link returned
                if (result.title && result.link) {
                    // This will check the database for a matching existing title to prevent duplicates. It will update an article or create a new Article using the result object that was scraped
                    db.Article.update({ title: result.title }, { $set: result }, { upsert: true })
                        .then((dbArticle) => {
                            console.log(dbArticle);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            });
            // scraping again for headlines - more content!
            // Use cheerio each method for each article scraped from top headlines
            $("ul.headlineStack__list").children("li").each((i, element) => {
                // Save an empty result object    
                const result = {};
                // Add title and href of an article, save them as properties of the result object
                result.title = $(element).children("a").text();
                result.link = `http://www.espn.com${$(element).children("a").attr("href")}`;
                // Make sure there is a title and link returned
                if (result.title && result.link) {
                    // This will check the database for a matching existing title to prevent duplicates. It will update an article or create a new Article using the result object that was scraped
                    db.Article.update({ title: result.title }, { $set: result }, { upsert: true })
                        .then((dbArticle) => {
                            console.log(dbArticle);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            });
        });
        res.redirect("/");
    });

    // Route for getting all articles from the db
    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then((dbArticle) => {
                res.json(dbArticle);
            })
            .catch((err) => {
                res.json(err);
            });
    });
    // Route for getting a specific article by id and populate it with associated notes
    app.get("/articles/:id", (req, res) => {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then((dbArticle) => {
                res.json(dbArticle);
            })
            .catch((err) => {
                res.json(err);
            })
    });
};