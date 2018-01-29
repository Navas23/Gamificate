const mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

var profesorSchema = new Schema({

	nDocente : { type : String },
	nombre : { type : String },
	primerApellido : { type : String },
	segundoApellido : { type : String },
	fechaNacimiento: { type : Date },
	nif : { type : String },
	email : { type : String },
	password : { type : String },
	departamento : { type : String }

})

module.exports = mongoose.model( 'Profesor', profesorSchema )
