var mongoose = require("mongoose");

var userSchema = mongoose.model("User", new mongoose.Schema({
    nickname: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

module.exports = userSchema;