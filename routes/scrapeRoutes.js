// Require all models
const db = require("../models");
// Require dependencies
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = (app) => {
    // Get route for scraping espn website
    app.get("/scrape", (req, res) => {
        // Use axios to grab espn body of html
        axios.get("http://www.cbssports.com/").then((response) => {
            // Load html data from axios into cheerio and save it as $ for short
            const $ = cheerio.load(response.data);

            // Use cheerio each method for each article scraped that has an image and summary
            $("section.article-list-single-lead").each((i, element) => {
                
                // Save an empty result object    
                const result = {};
                // Add title, summary, image, and href of an article, save them as properties of the result object
                result.title = $(element).children("div.article-list-item-image").children("a").attr("aria-label");
                //result.summary = $(element).children("section").children("a").children("div").children("div").children("p").text()
                result.link = $(element).children("div.article-list-item-image").children("a").attr("href");
                result.image = $(element).children("div.article-list-item-image").children("a").children("div").children("figure").children("img").attr("data-lazy");
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
            // // scraping again for headlines - more content!
            // // Use cheerio each method for each article scraped from top headlines
            // $("ul.headlineStack__list").children("li").each((i, element) => {
            //     // Save an empty result object    
            //     const result = {};
            //     // Add title and href of an article, save them as properties of the result object
            //     result.title = $(element).children("a").text();
            //     result.link = `http://www.espn.com${$(element).children("a").attr("href")}`;
            //     // Make sure there is a title and link returned
            //     if (result.title && result.link) {
            //         // This will check the database for a matching existing title to prevent duplicates. It will update an article or create a new Article using the result object that was scraped
            //         db.Article.update({ title: result.title }, { $set: result }, { upsert: true })
            //             .then((dbArticle) => {
            //                 console.log(dbArticle);
            //             })
            //             .catch((err) => {
            //                 console.log(err);
            //             })
                // }
            // });
        });
        res.redirect("/");
    });
};