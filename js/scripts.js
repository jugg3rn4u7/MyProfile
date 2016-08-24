;(function( $ ){

	/**
	 * In genereal you should avoid to use jQuery code in AngularJS
	 * apps, if you need any jQuery functionality create a directive
	 * 
	 */
  $(document).ready(function() {

  	function sendMail() {
  		var url = 'http://shrikantkakaraparthi.tech:3000/api/send-mail';
	  	var data = { subject: $('#subject').val(), content: $('#content').val() };
	  	var callback = function (response) {
	  		var result = response["result"];
	  		if( result == "ok" ) {
	  			alert("Message Sent !");
	  		} else {
	  			alert("Oops ! Didn't work. Try giving him a call :)");
	  		}
	  	};
	  	var dataType = 'JSON';

	  	$.ajax({
		  type: "POST",
		  url: url,
		  data: data,
		  success: callback,
		  failure: callback,
		  dataType: dataType,
		  contentType: "application/json"
		});
  	}

  	$( document ).delegate( "#send", "click", function() {
	  sendMail();
	});
    
  });


})( jQuery );