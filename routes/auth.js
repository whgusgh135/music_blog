var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcryptjs");

// AUTHENTICATION LOGIC
router.get("/register", function(req, res){
    res.render("./auth/register");
});

router.post("/register", function(req, res){
    //hide the magic decrypt number on github
    let hash = bcrypt.hashSync(req.body.user.password, process.env.HASHNUMBER);
    req.body.user.password = hash;
    
    User.create(req.body.user, function(err, newUser){
        if(err) {
            if (err.code === 11000){
                console.log("That user id is already taken, please try another.");
            } else {
                console.log("Unknown error, please try again.");
            }
            res.redirect("back");
        } else {
            req.session.userId = newUser._id;
            res.redirect("/songs");
        }
    });
});

router.get("/login", function(req, res){
    res.render("./auth/login");
});

router.post("/login", function(req, res){
    User.findOne({ id: req.body.user.id }, function(err, user){
        if (err || !user || !bcrypt.compareSync(req.body.user.password, user.password)) {
            console.log("Incorrect email / password.");
            return res.render("./auth/login");
        }
        req.session.userId = user._id;
        res.redirect("/songs");
    });
});

router.get("/logout", function(req, res){
    // logout function
    req.session.destroy();
    res.redirect("/songs");
});

module.exports = router;