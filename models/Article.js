// Dependency for mongoose creating model for mongo db
const mongoose = require("mongoose");
// save a reference to mongoose schema
const Schema = mongoose.Schema;

// Create a new object schema for Articles
const ArticleSchema = new Schema({
    // First property is a title for the name of the article, required
    title: {
        type: String,
        required: true
    },
    // Link is also a string that is required
    link: {
        type: String,
        required: true
    },
    summary: String,
    image: String,
    // The note is an object with an id
    // Ref will link the ObjectId of each Article to the Note model
    // This way we can populate the article with each associated note
    note: {
            type: Schema.Types.ObjectId,
            ref: "Note"
        },
    isSaved: {
        type: Boolean,
        default: false,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model from the schema using mongoose model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;