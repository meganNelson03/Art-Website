var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var seedDB = require("./seeds.js");
var fs = require("fs");


var app = express(); 
const portNum = process.env.PORT || 3001;

// CONFIGURATION
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27018/art_site_v3", {useNewUrlParser: "true", useUnifiedTopology: "true"});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//MODELS
var Piece = require("./models/pieces.js");

// seed the database with images
seedDB();



// ROUTES
app.get("/", (req, res) => {
	
	Piece.find({}, (err, piece) => {
		res.render("index", {piece: piece});
	});
	
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


app.get("/pieces/:id", (req, res) => {
	Piece.findById(req.params.id, (err, piece) => {
		if (err) throw err;
		console.log(piece);
		res.render("show", {piece: piece});
	});
});


app.listen(portNum, () => {
	console.log(`Listening at Port ${portNum}...`);
});