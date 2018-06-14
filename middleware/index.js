var middlewareObj = {};
var Song = require("../models/song")


// Middlewares

// To change any other youtube link to valid link for iframe
middlewareObj.modifyLink = function(link){
    var modifiedLink;
    if (link.includes("watch?v=")){
        modifiedLink = link.replace("watch?v=", "embed/");    
    } else if(link.includes("youtu.be/")){
        modifiedLink = link.replace("youtu.be/", "www.youtube.com/embed/");
    } else {
        return link;
    }
    return modifiedLink;
}

middlewareObj.loginRequired = function(req, res, next) {
    if (!req.user) {
        return res.redirect("/login");
    }
    next();
}

middlewareObj.adminRequired = function(req, res, next) {
    if (!req.user) {
        return res.redirect("/login");
    // hide admin account name on github
    } else if (!(req.user.id == "adminaccount")) {
        return res.redirect("back");
    }
    next();
}

middlewareObj.checkSongOwnership = function(req, res, next) {
    Song.findById(req.params.id, function(err, foundSong){
        if(err) {
            res.redirect("back");
        } else {
            if((foundSong.author == req.user.id) || (req.user.id == "adminaccount")) {
                next();
            } else {
                res.redirect("back");
            }
        }
    })
}

module.exports = middlewareObj;