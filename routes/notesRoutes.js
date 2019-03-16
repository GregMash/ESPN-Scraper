// Require all models
const db = require("../models");

module.exports = (app) => {

    // Route for getting all of the notes in the db
    app.get("/notes/:articleId", (req, res) => {
        db.Note.find({ articleId: req.params.articleId })
            .then((dbNote) => {
                res.json(dbNote);
            })
            .catch((err) => {
                res.json(err);
            })
    });

    //post route to delete a note
    app.post('/notes/delete/:id', (req, res) => {
        let noteId  = req.params.id;
        db.Note
            .remove({ _id: noteId })
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
    });


    // Route for saving or updating an Article's associated note
    app.post("/articles/:id", (req, res) => {
        console.log(req.params.id);
        // Create a new note and pass req.body to the entry
        req.body.articleId = req.params.id
        db.Note.create(req.body)
            .then((dbNote) => {
                return db.Article.findOneAndUpdate(
                    // Find one article based on req.params.id
                    { _id: req.params.id },
                    // Tell mongoose query to return the updated article instead of default original
                    { new: true },
                    // Update the article to be associated with the new note
                    { note: dbNote._id })
            })
            .then((dbArticle) => {
                res.json(dbArticle);
            })
            .catch((err) => {
                res.json(err);
            })
    });
}