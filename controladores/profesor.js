var mongoose = require( 'mongoose' )
var Profesor = mongoose.model( 'Profesor' )

//GET - Devuelve todos los documentos
exports.findAll = function( request, response ) {

 Profesor.find(function( error , profesores ) {

	 if( error ) response.send( 500, error.message )
	 console.log('GET /profesores')
	 response.status(200).jsonp( profesores )

 })

}

//GET - Devuelve un documento en funcion de un ID
exports.findById = function( request, response ) {

 Profesor.find( { 'nDocente' : request.params.id } , function( error, profesor ) {

	 if(error) return response.send(500, error.message)
	 console.log('GET /profesores/' + request.params.id)
	 response.status(200).jsonp(profesor)

 })

}

//POST - Inserta un nuevo documento
exports.add = function( request, response ) {

  console.log( 'POST' )
  console.log( request.body )
  var profesor = new Profesor({

    nDocente: request.body.nDocente,
    nombre: request.body.nombre,
    primerApellido: request.body.primerApellido,
    segundoApellido: request.body.segundoApellido,
    nif: request.body.nif,
    email: request.body.email,
    password: request.body.password,
    departamento: request.body.departamento

  })

  profesor.save(function(error, profesor) {

    if(error) return response.send(500, error.message)
    response.status(200).jsonp(profesor)

  })

}

//PUT - Actualiza un documento existente
exports.update = function(request, response) {

 	Profesor.findById( { 'nDocente' : request.params.id } , function(error, profesor) {

 		profesor.nDocente = request.body.nDocente,
		profesor.nombre = request.body.nombre,
		profesor.primerApellido = request.body.primerApellido,
		profesor.segundoApellido = request.body.segundoApellido,
		profesor.nif = request.body.nif,
		profesor.email = request.body.email,
		profesor.password = request.body.password,
		profesor.departamento = request.body.departamento

		profesor.save(function(error) {

      if(error) return response.send(500, error.message)
      response.status(200).jsonp(profesor)

		})

	})

}

//DELETE - Borra un documento en función de su ID
exports.delete = function(request, response) {

 Profesor.findById( request.params.id , function(error, profesor) {

	 profesor.remove(function(error) {

		 if( error ) return response.send( 500, error.message )
		 response.json( { message: 'Successfully deleted' } )

	 })

 })

}
