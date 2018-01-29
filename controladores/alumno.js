var mongoose = require( 'mongoose' )
var Alumno = mongoose.model( 'Alumno' )

//GET - Return all registers
exports.findAll = function( request, response ) {

 Alumno.find(function( error , alumnos ) {

	 if( error ) response.send( 500, error.message )
	 console.log('GET /alumnos')
	 response.status(200).jsonp( alumnos )

 })

}

//GET - Return a register with specified ID
exports.findById = function( request, response, callback ) {

	var id = null
	var serverMode = false //0 es peticion, 1 es llamada desde servidor
	if( typeof callback == 'function' ){
		id = request
		serverMode = true
	}else{
		id = request.params.id
	}

	Alumno.find( { 'nMatricula': id } , function( error, alumno ) {

		if( serverMode ){
			if(error) return callback( error )
			return callback(null, alumno)
		}else{

			if(error) return response.send(500, error.message)
			console.log('GET /alumnos/' + request.params.id)
			response.status(200).jsonp(alumno)

		}

	})

}

//POST - Insert a new register
exports.add = function( request, response ) {

 console.log( 'POST' )
 console.log( request.body )
 var alumno = new Alumno({

 		nMatricula: request.body.nMatricula,
		nombre: request.body.nombre,
		primerApellido: request.body.primerApellido,
		segundoApellido: request.body.segundoApellido,
		nif: request.body.nif,
		email: request.body.email,
		password: request.body.password,
		puntos: request.body.puntos || 0

 })

 alumno.save(function(error, alumno) {

	 if(error) return response.send(500, error.message)
	 response.status(200).jsonp(alumno)

 })

}

//PUT - Update a register already exists
exports.update = function(request, response) {

	Alumno.findById(request.params.id, function(error, alumno) {

 		//console.log( arguments )
 		alumno.nMatricula = request.body.nMatricula || alumno.nMatricula
		alumno.nombre = request.body.nombre || alumno.nombre
		alumno.primerApellido = request.body.primerApellido || alumno.primerApellido
		alumno.segundoApellido = request.body.segundoApellido || alumno.segundoApellido
		alumno.nif = request.body.nif || alumno.nif
		alumno.email = request.body.email || alumno.email
		alumno.password = request.body.password || alumno.password
		alumno.puntos = request.body.puntos || alumno.puntos

		alumno.save(function(error) {

		 if(error) return response.send(500, error.message)
		 response.status(200).jsonp(alumno)

		})

	})

}

//DELETE - Delete a register with specified ID
exports.delete = function(request, response) {

 Alumno.findById( request.params.id , function(error, alumno) {

	 alumno.remove(function(error) {

		 if( error ) return response.send( 500, error.message )
		  response.status(200).jsonp( { message: 'Successfully deleted' } )

	 })

 })

}