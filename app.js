// Initialize the map
function initGeo(map) {
  // Create a new marker object for the user's location
  const options = {
    // enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 100000000000,
  };
  function setMarker(crds) {
    console.log(crds)
    var marker2 = new google.maps.Marker({
      position: {lat: crds.lat, lng: crds.long},
      map: map,
      title: "Your Location",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });
    console.log(crds)
    const circle = new google.maps.Circle({
      map: map,
      radius: crds.acc, // show accuracy circle around the user's location
      center: new google.maps.LatLng(crds.lat, crds.long),
      fillColor: "#007bff",
      fillOpacity: 0.2,
      strokeColor: "#007bff",
      strokeOpacity: 0.3,
      strokeWeight: 2,
    });
    // const marker = new google.maps.Marker({
    //   position: [52.50744257788, 13.49879719025],
    //   map: map,
    //   title: "Your Location",
    //   icon: {
    //     url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    //   },
    // });
  }
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    console.log(map);
    
    setMarker({
      lat:crd.latitude,
      long:crd.longitude,
      acc:crd.accuracy
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
  navigator.geolocation.getCurrentPosition(success, error, options);

}

function initMap() {
  
  const stopButton = document.getElementById("stopButton");
  var audio1 = document.getElementById('audio1');
  var audio2 = document.getElementById('audio2');
  var center = {lat: 52.5209537, lng: 13.3865511};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12.9,
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
  setInterval(initGeo, 5000);
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
