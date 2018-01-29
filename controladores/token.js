var mongoose = require( 'mongoose' )
var Token = mongoose.model( 'Token' )

//GET - Devuelve todos los documentos
exports.findAll = function( request, response ) {

 Token.find(function( error , tokens ) {

	 if( error ) response.send( 500, error.message )
	 console.log('GET /tokens')
	 response.status(200).jsonp( tokens )

 })

}

//GET - Devuelve un documento en funcion de su ID
exports.findById = function( request, response, callback ) {

	var id = null
	var serverMode = false //0 es peticion, 1 es llamada desde servidor
	if( typeof callback == 'function' ){
		id = request
		serverMode = true
	}else{
		id = request.params.id
	}

 	Token.find( { 'idUsuario' : id } , function( error, token ) {

	 	if( serverMode ){

	 		if(error) return callback( error )
	 		return callback( null, token )

	 	}else{

	 		if(error) return response.send(500, error.message)
			console.log('GET /tokens/' + request.params.id)
			response.status(200).jsonp(token)

	 	}

	})

}

//POST - Inserta un nuevo token
exports.add = function( request, callback ) {

	console.log( 'POST' )
	console.log( request.body )
	var token = new Token({

		idUsuario: request.body.idUsuario,
		token: request.body.token

	})

	token.save(function(error, token) {

		if(error) return callback( error )
		return callback( null, token )

	})

}

//PUT - Actualiza un documento existente
exports.update = function(request, response) {

 Token.findById(request.params.id, function(error, token) {

	 token.idUsuario = request.body.idUsuario
	 token.token = request.body.token
   token.tipo = request.body.tipo

	 token.save(function(error) {

		 if(error) return response.send(500, error.message)
		 response.status(200).jsonp(token)

	 })

 })

}

//DELETE - Borra un documento en funcion de su ID
exports.delete = function(request, response) {

 Token.find( { 'idUsuario' : request.params.id } , function(error, token) {

	 token.remove(function(error) {

		 if( error ) return response.send( 500, error.message )
		 response.json( { message: 'Successfully deleted' } )

	 })

 })

}
