var mongoose = require("mongoose");
var Piece = require("./models/pieces.js");


var pieces = [
	{
		name: "The Beach",
		image: "./imgs/the_beach.png",
		description: "black pen"

	},
	{
		name: "Other Joyce",
		image: "./imgs/joyce2.jpg",
		description: "colored pencil"
	},
	{
		name: "Joyce",
		image: "./imgs/joyce.jpg",
		description: "colored pencil"
	},
	{
		name: "Ali Reza",
		image: "./imgs/alireza.jpg",
		description: "colored pencil"
	},
	{
		name: "Tents",
		image: "./imgs/camping.jpg",
		description: "marker"
	}
];

function seedDB() {
	
	Piece.deleteMany({}, (err) => {

		if (err) throw err;
		console.log("deleted piece");

		pieces.forEach((piece) => {
			Piece.create(piece, (err, art) => {
				if (err) throw err;
				console.log("added piece");

			})
		});

	});

	
}

module.exports = seedDB;