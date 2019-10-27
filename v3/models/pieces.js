var mongoose = require("mongoose");


var pieceSchema = mongoose.Schema({
	name: String,
	image: String,
	height: Number,
	width: Number,
	description: String,
	tag: String
});


module.exports = mongoose.model("Piece", pieceSchema);