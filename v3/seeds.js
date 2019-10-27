var mongoose = require("mongoose");
var Piece = require("./models/pieces.js");
var gm = require("gm"); //for finding image size

var wide, tall, normal; 

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
		descrption: "pen and ink",
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
		name: "amanda.jpg",
		image: "/imgs/amanda.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Chair",
		image: "/imgs/chair.jpg",
		description: "marker",
		tag: "cp"
	},
	{
		name: "Outdoors",
		image: "/imgs/outdoors.jpg",
		description: "coffee painting",
		tag: "p"
	}, 
	{
		name: "inside",
		image: "/imgs/coffee.jpg",
		description: "coffee paining",
		tag: "p"
	},
	{
		name: "nscon logo",
		image: "/imgs/nsconlogo.png",
		description: "black and white",
		tag: "bw"
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
		var h, w;

		for (let i=0; i<pieces.length; i++) {

			promises[i] = new Promise((resolve, reject) => {
				gm('./public/' + pieces[i].image).size((err, size) => {
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

		Promise.all(promises).then(async (values) => {


			pieces.forEach((piece) => {

				Piece.create(piece, (err, art) => {
					console.log("Created piece: " + art.name);
				});
			});	
		});

	});
}






		// for (let i=0; i<pieces.length; i++) {

		// 	console.log("curr piece " + pieces[i].name);

		// 	gm('./public/' + pieces[i].image).size((err, size) => {
		// 		if (err) throw err;
		// 		var h = size.height;
		// 		var w = size.width;

		// 		pieces[i].height = h;
		// 		pieces[i].width = w;

			
		// 	}, () => {
		// 		Piece.create(pieces[i], (err, art) => {
		// 			if (err) throw err;
		// 			console.log(`added piece: ${art.name}, ${art.width}`);

		// 		});
		// 	});	
				
		// }


		// pieces.forEach(async (piece) => {

		// 	await gm("./public/" + piece.image).size(async (err, size) => {
		// 			if (err) throw err;
		// 			var h = await size.height;
		// 			var w = await size.width;

		// 			piece.height = h;
		// 			piece.width = w;	

		// 			Piece.create(piece, (err, art) => {

		// 				if (err) throw err;
		// 				console.log("added piece");
		// 				console.log(art.name + "," + art.width);

		// 			});
				
		// 	});
			
		// });



	

module.exports = seedDB;