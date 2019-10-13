var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var seedDB = require("./seeds.js");
var fs = require("fs");

var app = express(); 


// CONFIGURATION
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/art_site_v0");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//MODELS
var Piece = require("./models/pieces.js");

// seed the database with images
seedDB();


app.get("/", (req, res) => {
	res.render("index");
});

app.get("/pieces", (req, res) => {

	Piece.find({}, (err, pieces) => {
		if (err) {
			console.log(err);
		} else {
			res.render("pieces", {pieces: pieces});
		}

	});

});

app.get("/about", (req, res) => {
	res.render("about")
});


app.listen(3001, () => {
	console.log("Listening at Port 3001...");
});