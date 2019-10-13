var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");

var app = express(); 


// CONFIGURATION
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/art_site_v0");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
	res.render("index");
});

app.get("/pieces", (req, res) => {
	res.render("pieces")
});

app.get("/about", (req, res) => {
	res.render("about")
});


app.listen(3001, () => {
	console.log("Listening at Port 3001...");
});