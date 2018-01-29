
var getAlumnos = function( callback ){

	$.ajax({

	  url: "http://localhost:8080/api/alumnos",
	  type: "GET",
	  contentType: 'application/json; charset=utf-8',

	  success: function( resultData ) {
	  	return callback( null, resultData )
	  },
	  error : function(jqXHR, textStatus, errorThrown) {
	  	return callback( errorThrown )
	  },

	  timeout: 120000,

	});

}

$(document).ready(function() {

	getAlumnos( function( error, alumnos ){

		//console.log( arguments )

		if( error ){
			return alert( error )
		}

		var listaAlumnos = []

		alumnos.forEach( function(alumno){

			var alumnoDom = $( '.prototipo-alumno' ).clone().removeClass('prototipo-alumno');
			alumnoDom.find( '.numero-matricula' ).text( alumno.nMatricula )
			alumnoDom.find( '.nombre' ).text( alumno.nombre )
			alumnoDom.find( '.primer-apellido' ).text( alumno.primer_apellido )
			alumnoDom.find( '.segundo-apellido' ).text( alumno.segundo_apellido )
			alumnoDom.find( '.fecha-nacimiento' ).text( alumno.fecha_nacimiento )
			alumnoDom.find( '.nif' ).text( alumno.nif )
			alumnoDom.find( '.email' ).text( alumno.email )
			alumnoDom.find( '.puntos' ).text( alumno.puntos )

			listaAlumnos.push( alumnoDom )

		})

		$('.tabla').append( listaAlumnos )
		$( '.prototipo-alumno' ).remove()

	  $('#dataTable').DataTable()

	})



});
