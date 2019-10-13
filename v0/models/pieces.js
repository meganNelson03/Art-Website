var mongoose = require("mongoose");


var pieceSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String
});


module.exports = mongoose.model("Piece", pieceSchema);