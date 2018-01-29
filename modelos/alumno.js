const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

var alumnoSchema = new Schema({

	nMatricula : { type : String },
	nombre : { type : String },
	primerApellido : { type : String },
	segundoApellido : { type : String },
	fechaNacimiento: { type : Date },
	nif : { type : String },
	email : { type : String },
	password : { type : String },
	puntos : { type : Number }

})

module.exports = mongoose.model( 'Alumno', alumnoSchema )
