var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var sessions = require("client-sessions");
var helmet = require("helmet");
var expressSanitizer = require("express-sanitizer");
var app = express();
var seedDB = require("./seed");

// requiring routes
var songRoutes = require("./routes/song");
var commentRoutes = require("./routes/comment");
var authRoutes = require("./routes/auth");


// schema
var User = require("./models/user");


mongoose.connect(process.env.DATABASEURL);


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sessions({
    cookieName: "session",
    secret: process.env.COOKIESECRET,
    duration: 30 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));
app.use(helmet());
app.use(expressSanitizer());
/*seedDB();*/

// middleware
// check if session cookie is there i.e. user has logged in
app.use(function(req, res, next){
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

// Use routes
app.use("/songs", songRoutes);
app.use("", commentRoutes);
app.use("", authRoutes);


// Main page
app.get("/", function(req, res){
    res.redirect("/songs");
});


app.listen(process.env.PORT, process.env.IP);