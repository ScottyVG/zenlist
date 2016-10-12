$(document).ready(function(){


$("#mapButton").keypress(function(event) {
  if(event.which == 10) {
    event.preventDefault()
    getInfo()
  }
})

//API connection
function getInfo() {
  var lat
  var lng
  var mapButton = $("#mapButton").val()
  var encoded = encodeURIComponent(mapButton)
}

$.ajax({
           method: 'POST',
           url: `https://maps.googleapis.com/maps/api/geocode/json?address=key=AIzaSyBigSf6-8gu4tBe7_m9pFIwyQylIXmCAmY${encoded}`,
           datatype: 'json',
           success: function(data) {
               if (!data.items.length) {
                   Materialize.toast('Location not found', 3000)
               }
               long = data.items[0].location.longitude
               lat = data.items[0].location.latitude

})


// $("#map_button").on( "click", function() {
//         $.get("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIgnCf09gcOnTUVjMdIzw2M3EA1NRmXio")
//     });
