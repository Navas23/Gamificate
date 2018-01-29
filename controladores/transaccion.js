var mongoose = require( 'mongoose' )
var Transaccion = mongoose.model( 'Transaccion' )

//GET - Return all registers
exports.findAll = function( request, response ) {

 Transaccion.find(function( error , transacciones ) {

	 if( error ) response.send( 500, error.message )
	 console.log('GET /transacciones')
	 response.status(200).jsonp( transacciones )

 })

}

//GET - Return a register with specified ID
exports.findById = function( request, response ) {

 Transaccion.findById( request.params.id , function( error, transaccion ) {

	 if(error) return response.send(500, error.message)
	 console.log('GET /transacciones/' + request.params.id)
	 response.status(200).jsonp(transaccion)

 })

}

//POST - Insert a new register
exports.add = function( request, response ) {

 console.log( 'POST' )
 console.log( request.body )
 var transaccion = new Transaccion({

 		alumno: request.body.alumno,
		profesor: request.body.profesor,
		fecha: request.body.fecha,
		valor: request.body.valor,
		descripcion: request.body.descripcion

 })

 transaccion.save(function(error, transaccion) {

	 if(error) return response.send(500, error.message)
	 response.status(200).jsonp(transaccion)

 })

}

//PUT - Update a register already exists
exports.update = function(request, response) {

 Transaccion.findById(request.params.id, function(error, transaccion) {

	 transaccion.alumno = request.body.alumno,
	 transaccion.profesor = request.body.profesor,
	 transaccion.fecha = request.body.fecha,
	 transaccion.valor = request.body.valor,
	 transaccion.descripcion = request.body.descripcion

	 transaccion.save(function(error) {

		 if(error) return response.send(500, error.message)
		 response.status(200).jsonp(transaccion)

	 })

 })

}

//DELETE - Delete a register with specified ID
exports.delete = function(request, response) {

 Transaccion.findById( request.params.id , function(error, transaccion) {

	 transaccion.remove(function(error) {

		 if( error ) return response.send( 500, error.message )
		 response.json( { message: 'Successfully deleted' } )

	 })

 })

}