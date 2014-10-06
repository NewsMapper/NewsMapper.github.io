$(document).ready(function(){
  $('#map-canvas').css('height', $(window).height() - 48 + 'px');
  var options = {
      zoom: 4,
      maxZoom: 20,
      minZoom: 4,
      center: new google.maps.LatLng(38.251123,-97.998047),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#fffffa"}]},{"featureType":"water","stylers":[{"lightness":50}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"lightness":40}]}]
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), options);
  function createMarker(point) {
        var latlng = new google.maps.LatLng(point["lat"],point["lon"]);
      var infowindow = new google.maps.InfoWindow({
        content: point["title"]
      });

      var marker = new google.maps.Marker({
          position: latlng,
          map: map,
      });

      google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, this);
        });

      if ($(window).width() > 500) {
        google.maps.event.addListener(marker, 'mouseout', function() {
              infowindow.close();
        });
      }

  }

  function initialize() {
    var points = [
      {
        "lat" : 40.804333,
        "lon" : -74.448922,
        "title" : "Herro der fwend."
      },{
        "lat" : 40.712643,
        "lon" : -74.3546,
        "title" : "How are you?"
      }
    ];

    for (i=0;i<points.length;i++) {
      createMarker(points[i]);
    }
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $('#field').click(function() {
    $('#field').css('border', 'none');
    $('#field').attr('placeholder', 'email@host.com');
  });

  $('body').click(function(e) {
    if (!$(e.target).is('#field')) {
        $('#field').attr('placeholder', 'subscribe to updates');
    }
  });

  var res = window.location.search;
  if (res == "?s") {
    $('#messages').flash_message({
        text: 'You\'re on our list! Thank you for your time; we promise we\'ll put it to use!',
        how: 'append'
    });
  } else if (res == "?f") {
    document.getElementById("message").innerHTML = "Oops! There was a problem processing that address; please try again.";
    $('#message').removeClass('text-primary');
    $('#message').addClass('text-danger');
  } else if (res == "?e") {
    document.getElementById("message").innerHTML = "Oops! There's a problem with our script. Please <a href='mailto:team@gdyer.de'>email us</a> ASAP!";
    $('#message').removeClass('text-primary');
    $('#message').addClass('text-warning');
  }


  (function($) {
      $.fn.flash_message = function(options) {
        
        options = $.extend({
          text: 'Done',
          time: 1000,
          how: 'before',
          class_name: ''
        }, options);
        
        return $(this).each(function() {
          if( $(this).parent().find('.flash_message').get(0) )
            return;
          
          var message = $('<span />', {
            'class': 'flash_message ' + options.class_name,
            text: options.text
          }).hide().fadeIn('fast');
          
          $(this)[options.how](message);
          
          message.delay(options.time).fadeOut('normal', function() {
            $(this).remove();
          });
          
        });
      };
  })(jQuery);


});