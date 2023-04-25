// Initialize the map
function initGeo(map) {
  // Create a new marker object for the user's location
  const options = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
}

function initMap() {
  
  const stopButton = document.getElementById("stopButton");
  var audio1 = document.getElementById('audio1');
  var audio2 = document.getElementById('audio2');
  var center = {lat: 52.5209537, lng: 13.3865511};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14.5,
    center: center
  });
  
  // Add markers to the map
  var marker1 = new google.maps.Marker({
    position: {lat: 52.519162568135144, lng: 13.401166963949985},
    map: map
  });
  var marker2 = new google.maps.Marker({
    position: {lat: 52.52135421233425, lng: 13.396890832463953},
    map: map
  });
  
  // Add click event listeners to the markers
  marker1.addListener('click', function() {
    audio1.currentTime = 0;
    audio1.play();
  });
  
  marker2.addListener('click', function() {
    audio2.currentTime = 0;
    audio2.play();
  });
  stopButton.addEventListener("click", function() {
        audio1.pause();
        audio1.currentTime = 0;
        audio2.pause();
        audio2.currentTime = 0;
        resetPlaying();
  });
  initGeo(map);
}

function handleGeolocationError(error) {
  console.log('hi')
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.error("An unknown error occurred.");
      break;
  }
}
