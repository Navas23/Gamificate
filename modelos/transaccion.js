const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

var transaccionSchema = new Schema({

	alumno : { type : String },
	profesor : { type : String },
	fecha: { type : Date },
	valor : { type : Number },
	despripcion : { type : String }

})

module.exports = mongoose.model( 'Transaccion', transaccionSchema )
