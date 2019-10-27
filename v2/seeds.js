var mongoose = require("mongoose");
var Piece = require("./models/pieces.js");
var gm = require("gm"); //for finding image size

var wide, tall, normal; 

var pieces = [
	{
		name: "The Beach",
		image: "./imgs/the_beach.png",
		description: "black and white",
		tag: "bw"

	},
	{
		name: "Flower",
		image: "./imgs/flower.jpeg",
		descrption: "pen and ink",
		tag: "bw"
	},
	{
		name: "something",
		image: "./imgs/something.png",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "house",
		image: "./imgs/house.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "grandma",
		image: "./imgs/grandma.jpg",
		description: "marker",
		tag: "m"
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
		name: "chairs",
		image: "./imgs/chair.jpg",
		description: "pen and ink",
		tag: "bw"
	},
	{
		name: "Tents",
		image: "./imgs/camping.jpg",
		description: "marker",
		tag: "m"
	},
	{
		name: "amanda.jpg",
		image: "./imgs/amanda.jpg",
		description: "colored pencil",
		tag: "cp"
	},
	{
		name: "Chair",
		image: "./imgs/chair.jpg",
		description: "marker",
		tag: "cp"
	},
	{
		name: "Outdoors",
		image: "./imgs/outdoors.jpg",
		description: "coffee painting",
		tag: "p"
	}, 
	{
		name: "inside",
		image: "./imgs/coffee.jpg",
		description: "coffee paining",
		tag: "p"
	},
	{
		name: "nscon logo",
		image: "./imgs/nsconlogo.png",
		description: "black and white",
		tag: "bw"
	},
	{
		name: "crossword puzzle",
		image: "./imgs/crossword.jpg",
		description: "pen",
		tag: "bw"
	}

];



function isWide(height, width) {
	var ratio = height/width; 
	if (ratio <= .81) {
		return true;
	}
	return false;
}

function isTall(height, width) {
	var ratio = height/width;
	if (ratio >= 1.1) {
		return true;
	}
	return false;
}


function reorderPiecesArray(wideArr, tallArr, normArr) {
	let piecez = []; 

	// all wide and tall elements in piecez
	for (let i = 0; i<pieces.length; i++) {
		if (wideArr[i] !== undefined && tallArr[i] !== undefined) {
			piecez.push(wideArr[i], tallArr[i]);
		} else if (wideArr[i] === undefined && tallArr[i] !== undefined) {
			piecez.push(tallArr[i]);
		} else if (wideArr[i] !== undefined && tallArr[i] === undefined) {
			piecez.push(wideArr[i]);
		} 
	}
	// then put all normal sized imgs into piecez
	for (let i=0; i<normArr.length; i++) {
		piecez.push(normArr[i]);
	}

	return piecez; 

}


function seedDB() {
	
	Piece.deleteMany({}, (err) => {

		if (err) throw err;
		console.log("deleted pieces");
		var promises = new Array(pieces.length);
		var h, w;
		wide = new Array(pieces.length);
		tall = new Array(pieces.length);
		normal = new Array(pieces.length);

		for (let i=0; i<pieces.length; i++) {

			promises[i] = new Promise((resolve, reject) => {
				gm('./public/' + pieces[i].image).size((err, size) => {
					if (err) reject(err);	

					h = size.height;
					w = size.width;

					if (isTall(h, w)) {
						tall.push(pieces[i]);
					} else if (isWide(h, w)) {
						wide.push(pieces[i]);
					} else {
						normal.push(pieces[i]);
					}


					pieces[i].height = h;
					pieces[i].width = w;

					resolve(size);
				});
			});
			promises.push(promises[i]);
		}

		Promise.all(promises).then(async (values) => {
			//console.log(values[i].height);

			console.log("WIDE");
			console.log(wide);
			console.log("tall");
			console.log(tall);
			console.log("NORMAL");
			console.log(normal);

			console.log("*********************");


			wide = wide.filter(function() {
				return true;
			});
			tall = tall.filter(function() {
				return true;
			});
			normal = normal.filter(function() {
				return true;
			});


			var pcs = await reorderPiecesArray(wide, tall, normal);
			console.log(pcs);


			pcs.forEach((piece) => {

				Piece.create(piece, (err, art) => {
					console.log("Created piece: " + art.name + "," + isTall(art.height, art.width));
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