var mongoose = require("mongoose");
var Piece = require("./models/pieces.js");
var gm = require("gm"); //for finding image size

var pieces = [
	{
		name: "The Beach",
		image: "/imgs/the_beach.png",
		description: "black and white",
		tag: "bw"

	},
	{
		name: "Flower",
		image: "/imgs/flower.jpeg",
		description: "pen and ink",
		tag: "bw"
	},
	{
		name: "something",
		image: "/imgs/something.png",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "Other other",
		image: "/imgs/joyce3.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "house",
		image: "/imgs/house.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "grandma",
		image: "/imgs/grandma.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "Other Joyce",
		image: "/imgs/joyce2.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Joyce",
		image: "/imgs/joyce.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Ali Reza",
		image: "/imgs/alireza.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "chairs",
		image: "/imgs/chair.jpg",
		description: "pen and ink",
		tag: "bw"
	},
	{
		name: "Tents",
		image: "/imgs/camping.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "amanda",
		image: "/imgs/amanda.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "myself",
		image: "/imgs/myself.jpg",
		description: "oil painting",
		tag: "p"
	},
	{
		name: "sugarhouse coffee",
		image: "/imgs/sugarhouse.jpg",
		description: "watercolor",
		tag: "p"
	},
	{
		name: "outdoors",
		image: "/imgs/outdoors.jpg",
		description: "colored pencil",
		tag: "p"
	}, 
	{
		name: "outdoors",
		image: "/imgs/coffee.png",
		description: "coffee painting",
		tag: "cp"
	},
	{
		name: "little statue",
		image: "/imgs/littlestatue.jpg",
		description: "coffee painting",
		tag: "cp"
	},
	{
		name: "inside",
		image: "/imgs/coffee.jpg",
		description: "coffee paining",
		tag: "p"
	},
	{
		name: "cagefan.jpg",
		image: "/imgs/cagefan.jpg",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "indoors",
		image: "/imgs/indoors.jpg",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "purple girl",
		image: "/imgs/purple.jpeg",
		description: "digital",
		tag: "d"
	},
	{
		name: "nscon logo",
		image: "/imgs/nsconlogo.png",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "stuff",
		image: "/imgs/stuff.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "crossword puzzle",
		image: "/imgs/crossword.jpg",
		description: "pen",
		tag: "bw"
	}

];


function seedDB() {
	
	Piece.deleteMany({}, (err) => {

		if (err) throw err;
		console.log("deleted pieces");
		var promises = new Array(pieces.length);
		var h, w, isItWide;

		for (let i=0; i<pieces.length; i++) {

			promises[i] = new Promise((resolve, reject) => {
				gm('./public/' + pieces[i].image).size(async (err, size) => {
					if (err) reject(err);	

					h = size.height;
					w = size.width;

					pieces[i].height = h;
					pieces[i].width = w;


					resolve(size);
				});
			});
			promises.push(promises[i]);
		}

		Promise.all(promises).then((values) => {

			pieces.forEach((piece) => {	

				Piece.create(piece, (err, art) => {
					console.log("Created piece: " + art);
				});
			});	
		});

	});
}

module.exports = seedDB;