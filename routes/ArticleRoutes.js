// Require all models
const db = require("../models");

module.exports = (app) => {

    // Route for getting all articles from the db
    app.get("/", (req, res) => {
        db.Article.find({})
            .sort({ createdAt:-1 })
            .populate("note")
            .then((data) => {
                const hbsObject = {
                    articles: data
                };
                res.render("index", hbsObject);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // Route for getting all articles from the db
    app.get("/articles", (req, res) => {
        db.Article.find({})
            .populate("note")
            .then((data) => {
                res.json(data);
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

    // Route for getting json of all of the saved articles in the db
    app.get("/saved", (req, res) => {
        db.Article.find({ isSaved: true })
            .then((data) => {
                const hbsObject = {
                    articles: data
                };
                res.render("savedArticles", hbsObject);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // Route for posting saved articles
    app.put("/saved/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: true })
            .then((dbArticle) => {
                res.json(dbArticle);
            }).catch((err) => {
                res.json(err);
            });
    })

    // Route for posting saved articles
    app.put("/deleted/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { isSaved: false })
            .then((dbArticle) => {
                res.json(dbArticle);
            }).catch((err) => {
                res.json(err);
            });
    })

};