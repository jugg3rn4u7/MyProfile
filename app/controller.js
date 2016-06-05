/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('myprofile')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;

    var uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
  
    var visitor_id = null, 
        visit_count = 0, 
        user_rating = null;

    $( document ).delegate( "#close-rate-me", "click", function() {
        $( "#sub-nav-bar" ).removeClass( "show" ).addClass( "hide" );
        user_rating = 0;
        if( LocalStorage.exists() ) {
          LocalStorage.set( 'user_rating' , user_rating);
        } else {
          Cookies.set( 'user_rating', user_rating, { expires: 365 });
        }
    });

    if( LocalStorage.exists() ) {

      visitor_id = LocalStorage.get( 'visitor_id' );
      visit_count = LocalStorage.get( 'visit_count' );
      user_rating = LocalStorage.get( 'user_rating' );

      if( !visitor_id ) { // new visitor
        LocalStorage.set( 'visitor_id' , uuid());
        LocalStorage.set( 'visit_count' , 1);

        navigator.geolocation.getCurrentPosition( function(position) {
          LocalStorage.set( 'latitude' , position.coords.latitude);
          LocalStorage.set( 'longitude' , position.coords.longitude);
          reverseGeoCode(position.coords.latitude, position.coords.longitude);
        });
        
      } else {
        LocalStorage.update( 'visit_count' , ++visit_count);

        navigator.geolocation.getCurrentPosition( function(position) {
          LocalStorage.update( 'latitude' , position.coords.latitude);
          LocalStorage.update( 'longitude' , position.coords.longitude);
          reverseGeoCode(position.coords.latitude, position.coords.longitude);
        });
      }

    } else {
      // No LocalStorage; Use Cookies;

      visitor_id = Cookies.get( 'visitor_id' );
      visit_count = Cookies.get( 'visit_count' );
      user_rating = Cookies.get( 'user_rating' );

      if( !visitor_id ) { // new visitor; Expire cookie after a year
        Cookies.set( 'visitor_id', uuid(), { expires: 365 }); 
      } 
        
      Cookies.set( 'visit_count', ++visit_count, { expires: 365 });

      navigator.geolocation.getCurrentPosition( function(position) {
        Cookies.set( 'latitude', position.coords.latitude, { expires: 365 });
        Cookies.set( 'longitude', position.coords.longitude, { expires: 365 });
        reverseGeoCode(position.coords.latitude, position.coords.longitude);
      });
      
    }   

    // New visitors only or user_rating doesn't exist
    if( !visitor_id || !user_rating) {

      $( "#sub-nav-bar" ).removeClass( "hide" ).addClass( "show" );

      $("#stars").rateYo({
        rating: 0.0,
        starWidth: "20px"
      }).on("rateyo.set", function (e, data) {
        
        user_rating = data.rating;

        if( LocalStorage.exists() ) {
          LocalStorage.set( 'user_rating' , user_rating);
        } else {
          Cookies.set( 'user_rating', user_rating, { expires: 365 });
        }

        $( "#sub-nav-bar" ).removeClass( "show" ).addClass( "hide" );
      });
    } else {
      $( "#sub-nav-bar" ).removeClass( "show" ).addClass( "hide" );
    }

    var reverseGeoCode = function (latitude, longitude) {

      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyCMICXTUToZWGTVxy_25NG7rv1sSDgchBg";

      $.getJSON( url, function (response) {
        
        if( LocalStorage.exists() ) {
            if( !visitor_id ) {
              LocalStorage.set( 'local_address' , response["results"][0]["formatted_address"]);
            } else {
              LocalStorage.update( 'local_address' , response["results"][0]["formatted_address"]);
            }
        } else {
            Cookies.set( 'local_address', response["results"][0]["formatted_address"], { expires: 365 });
        }    
      });
    };

    // Update database with visit_count and user_rating; send new data to server.
  

    ////////////  function definitions


    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }

})();