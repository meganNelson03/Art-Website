var mongoose = require("mongoose");
var Piece = require("./models/pieces.js");


var pieces = [
	{
		name: "The Beach",
		image: "./imgs/the_beach.png",
		description: "black and white",
		tag: "bw"

	},
	{
		name: "Other Joyce",
		image: "./imgs/joyce2.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Joyce",
		image: "./imgs/joyce.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Ali Reza",
		image: "./imgs/alireza.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Tents",
		image: "./imgs/camping.jpg",
		description: "marker"
		tag: "m"
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