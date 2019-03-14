// Dependency for mongoose creating model for mongo db
const mongoose = require("mongoose");
// save a reference to mongoose schema
const Schema = mongoose.Schema;

// Create a new object schema for Notes
const NoteSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    }
});

// Create model for note using above schema for mongoose model method
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;