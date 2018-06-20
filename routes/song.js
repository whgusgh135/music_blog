var express = require("express");
var router = express.Router();
var Song = require("../models/song");
var User = require("../models/user");
var middleware = require("../middleware/index");

router.use(function(req, res, next){
    if (!(req.session && req.session.userId)) {
        res.locals.user = null;
        return next();
    }
    User.findById(req.session.userId, function(err, user){
        if (err) {
            return next(err);
        }
        if (!user) {
            return next();
        }
        user.password = undefined;
        req.user = user;
        res.locals.user = user;
        next();
    });
});


// Song RESTful routes
// INDEX route
router.get("/songs", function(req, res){
    Song.find({}, function(err, foundSongs){
        if(err){
            console.log(err);
        } else {
            res.render("./songs/index", {songs: foundSongs});
        }
    });
});

router.get("/userlist", function(req, res){
    Song.find({}, function(err, foundSongs){
        if(err){
            console.log(err);
        } else {
            res.render("./songs/userlist", {songs: foundSongs});
        }
    });
});

// NEW route
router.get("/songs/new", middleware.loginRequired, function(req, res){
    res.render("./songs/new");
});

// CREATE route
router.post("/songs", function(req, res){
    req.body.song.description =  req.sanitize(req.body.song.description);
    if(!req.body.song.description){
        req.body.song.description = "No description";
    }
    req.body.song.link = middleware.modifyLink(req.body.song.link);
    var createSong = {song: req.body.song.song, artist: req.body.song.artist, image: req.body.song.image, link: req.body.song.link, description: req.body.song.description, author: req.user.id};
    Song.create(createSong, function(err, newSong){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/songs/" + newSong._id);
        }
    });
});

// SHOW route
router.get("/songs/:id", function(req, res){
    Song.findById(req.params.id).populate("comments").exec(function(err, foundSong){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            Song.find({}, function(err, allSongs){
                 if(err){
                    console.log(err);
                } else {
                    res.render("./songs/show", {song: foundSong, allSongs: allSongs});
                }
            });
        }
    });
});

// EDIT route
router.get("/songs/:id/edit", middleware.checkSongOwnership, function(req, res){
    Song.findById(req.params.id, function(err, foundSong){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("./songs/edit", {song: foundSong});
        }
    });
});

// UPDATE route
router.put("/songs/:id", middleware.checkSongOwnership, function(req, res){
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/songs/" + updatedSong._id);
        }
    });
});

// DESTROY route
router.delete("/songs/:id", middleware.checkSongOwnership, function(req, res){
    Song.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/userlist");
        }
    });
});





module.exports = router;