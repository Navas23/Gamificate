console.log('ey')

$( '.login-button' ).on( 'click' , function(){

	var form = $( 'form' )

	if( form.find('input[name="user"]').val() && form.find('input[name="password"]').val() ){

		var formData = form.serializeArray()
				console.log(JSON.stringify(getFormData(formData)))


		$.ajax({

		  type    : 'post',
		  url     : 'http://localhost:8080/login',
		  dataType: 'json',
		  data    : JSON.stringify(getFormData(formData)),
		  success : function( data ){

		    console.log( 'data', data )
		    console.log('no falla')
		    window.location = 'http://localhost:8080/login'

		  }

		})

	}	

})

function getFormData(data) {
   var unindexed_array = data;
   var indexed_array = {};

   $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
   });

   return indexed_array;
}