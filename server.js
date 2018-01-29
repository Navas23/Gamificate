//Modulos de node
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )
const methodOverride = require( 'method-override' )
const cookieParser = require( 'cookie-parser' )

//Conexion a la base de datos
mongoose.connect( 'mongodb://localhost/' , function( error , response ) {

 if( error ) throw error
 console.log( 'Conectado a la base de datos' )

});

var app = express()
//Cargamos middlewares
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )
app.use( methodOverride('_method') )
app.use( cookieParser() )

app.use( express.static('publico') )

//Importamos modelos y controladores
var modeloAlumno = require('./modelos/alumno')
var controladorAlumno = require('./controladores/alumno')

var modeloProfesor = require('./modelos/profesor')
var controladorProfesor = require('./controladores/profesor')

var modeloTransaccion = require('./modelos/transaccion')
var controladorTransaccion = require('./controladores/transaccion')

var modeloToken = require('./modelos/token')
var controladorToken = require('./controladores/token')

var router = express.Router();

//Ruta raiz
router.get( '/', function( request, response ){

	console.log( request.cookies )

	if( false ){
		response.setHeader('Set-Cookie', 'mycookie=test; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/')
	}else{
		response.redirect( '/login' )
	}

})

router.get( '/login', function( request, response ){

	response.sendFile( 'publico/login.html' , { root : __dirname } )

})

router.post( '/login', function( request, response ){

	//response.sendFile( 'public/login.html' , { root : __dirname } )
	//response.send( request )
	//console.log( 'request', request.body )

	var expireDate = new Date()
	expireDate.setTime( expireDate.getTime() + (60*60*1000) )
	expireDate = expireDate.toUTCString()

	controladorToken.findById( '090169', null, function( error,alumno ){

		console.log( error, alumno )

	})
	/*if( acceptedLogin( request.body ) ){

		var removeCookie = 'Thu, 01 Jan 1970 00:00:00 UTC'
		var token = getToken()
		var expireDate = new Date().toUTCString()

		response.setHeader('Set-Cookie', 'token=' + getToken() + '; expires=' + + '; path=/');

	}*/

})

app.use( router )

//Rutas del API

var api = express.Router()

api.route('/alumnos')
 .get( controladorAlumno.findAll )
 .post( controladorAlumno.add )

api.route('/alumnos/:id')
 .get( controladorAlumno.findById )
 .put( controladorAlumno.update )
 .delete( controladorAlumno.delete )

api.route('/profesores')
 .get( controladorProfesor.findAll )
 .post( controladorProfesor.add )

api.route('/profesores/:id')
 .get( controladorProfesor.findById )
 .put( controladorProfesor.update )
 .delete( controladorProfesor.delete )

api.route('/transacciones')
 .get( controladorTransaccion.findAll )
 .post( controladorTransaccion.add )

api.route('/transacciones/:id')
 .get( controladorTransaccion.findById )
 .put( controladorTransaccion.update )
 .delete( controladorTransaccion.delete )

app.use('/api', api)


//Arranque del servidor
app.listen( 80, function(){
	console.log( 'Servidor funcionando correctamente' )
})
