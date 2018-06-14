var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Song = require("../models/song");
var middleware = require("../middleware/index");

// Comment RESTful routes
// INDEX route & NEW route all in /songs/:id route
// SHOW route in songs/:id route

// CREATE route
router.post("/songs/:id/comments", middleware.loginRequired, function(req, res){
    Song.findById(req.params.id, function(err, song){
        if(err) {
            console.log(err);
            res.redirect("/songs");
        } else {
            req.body.comment.text =  req.sanitize(req.body.comment.text);
            Comment.create(req.body.comment, function(err, newComment){
                if(err) {
                    console.log(err);
                } else {
                    newComment.author.id = req.user._id;
                    newComment.author.nickname = req.user.nickname;
                    newComment.save();
                    song.comments.push(newComment);
                    song.save();
                    res.redirect("/songs/" + song._id);
                }
            });
        }
    });
});

module.exports = router;