
var getProfesores = function( callback ){

	$.ajax({

	  url: "http://localhost:8080/api/profesores",
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

	getProfesores( function( error, profesores ){

		//console.log( arguments )

		if( error ){
			return alert( error )
		}

		var listaProfesores = []

		profesores.forEach( function(profesor){

			var profesorDom = $( '.prototipo-profesor' ).clone().removeClass('prototipo-profesor');
			profesorDom.find( '.numero-docente' ).text( profesor.nDocente )
			profesorDom.find( '.nombre' ).text( profesor.nombre )
			profesorDom.find( '.primer-apellido' ).text( profesor.primerApellido )
			profesorDom.find( '.segundo-apellido' ).text( profesor.segundoApellido )
			profesorDom.find( '.fecha-nacimiento' ).text( profesor.fechaNacimiento )
			profesorDom.find( '.nif' ).text( profesor.nif )
			profesorDom.find( '.email' ).text( profesor.email )
			profesorDom.find( '.departamento' ).text( profesor.departamento )
			profesorDom.find( '.puntos' ).text( profesor.puntos )

			listaProfesores.push( profesorDom )

		})

		$('.tabla').append( listaProfesores )
		$( '.prototipo-profesor' ).remove()

	  $('#dataTable').DataTable()

	})

});
