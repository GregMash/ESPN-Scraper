// Require all models
const db = require("../models");

module.exports = (app) => {
    // get route for scraping espn website
    app.get("/scrape", (req, res) => {
        // use axios to grab espn body of html
        axios.get("http://www.espn.com/").then((response) => {
            // load html data from axios into cheerio and save it as $ for short
            const $ = cheerio.load(response.data);
            // use cheerio each method
            $("something goes here").each((i, element) => {
                // save an empty result object
                const result = {};
                // Add a title and href of every link, save them as properties of the result object
                result.title = $(this);
                result.link = $(this);
                // create a new Article using the result object that was scraped
                db.Article.create(result)
                    .then((dbArticle) => {
                        console.log(dbArticle);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            });
        });
        res.redirect("/articles");
    });

    // route for getting all articles from the db
    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then((dbArticle) => {
                res.json(dbArticle);
            })
            .catch((err) => {
                res.json(err);
            });
    });
    // route for getting a specific article by id
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