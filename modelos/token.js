const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

var tokenSchema = new Schema({

	idUsuario : { type : String },
	token : { type : String },
	tipo : { type : String }

})

module.exports = mongoose.model( 'Token', tokenSchema )
