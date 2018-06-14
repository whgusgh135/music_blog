var mongoose = require("mongoose");

var songSchema = new mongoose.Schema({
    song: String,
    artist: String,
    image: String,
    description: String,
    lyrics: String,
    link: String,
    author: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Song", songSchema);