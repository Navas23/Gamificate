
var getTransacciones = function( callback ){

	$.ajax({

	  url: "http://localhost:8080/api/transacciones",
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

	getTransacciones( function( error, transacciones ){

		//console.log( arguments )

		if( error ){
			return alert( error )
		}

		var listaTransacciones = []

		transacciones.forEach( function(transaccion){

			var transaccionDom = $( '.prototipo-transaccion' ).clone().removeClass('prototipo-transaccion');
			transaccionDom.find( '.alumno' ).text( transaccion.alumno )
			transaccionDom.find( '.profesor' ).text( transaccion.profesor )
			transaccionDom.find( '.fecha' ).text( transaccion.fecha )
			transaccionDom.find( '.valor' ).text( transaccion.valor )
			transaccionDom.find( '.descripcion' ).text( transaccion.nif )

			listaTransacciones.push( transaccionDom )

		})

		$('.tabla').append( listaTransacciones )
		$( '.prototipo-transaccion' ).remove()

	  $('#dataTable').DataTable()

	})

});
