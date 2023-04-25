const MAX_AGE = 100

function playAudio() {
  const audio = document.getElementById("audio1");
  audio.play();
}
// Initialize the map
function initGeo(map) {
  // Create a new marker object for the user's location
  const options = {
    // enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: MAX_AGE,
  };
  function setMarker(crds) {
    markerLoc = new google.maps.Marker({
      position: {lat: crds.lat, lng: crds.long},
      map: map,
      title: "Your Location",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });
    circle = new google.maps.Circle({
      map: map,
      radius: crds.acc, // show accuracy circle around the user's location
      center: new google.maps.LatLng(crds.lat, crds.long),
      fillColor: "#007bff",
      fillOpacity: 0.2,
      strokeColor: "#007bff",
      strokeOpacity: 0.3,
      strokeWeight: 2,
    });
    
  }
  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    
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
  // setInterval(changeMarker, 1000);
  
  // setInterval(function() {
  //   navigator.geolocation.getCurrentPosition(function success(pos) {
  //     const crd = pos.coords;
  //     changeMarker({lat: crd.latitude, lng: crd.longitude});
  //   }, function error(err) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   }, {
  //     timeout: 10000,
  //     maximumAge: 0,
  //   });
  // }, 1000);

  // Define a list of coordinates to simulate changing locations
  // randomChange();
  actualChange();

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function updateLocationInfo(lat, lng) {
  const locationInfo = document.getElementById("location-info");
  locationInfo.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`;
}


function actualChange(){
  const options = {
    // enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: MAX_AGE,
  };
  setInterval(function() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('here')
      console.log(position.coords.latitude)
      changeMarker({lat:position.coords.latitude, lng:position.coords.longitude} );
    }, error, options);
  }, 1000);
}

function randomChange(){
  const coordinates = [
    { lat: 52.519983, lng: 13.401516 },
    { lat: 52.519765, lng: 13.401460 },
    { lat: 52.519592, lng: 13.401438 },
    { lat: 52.520183, lng: 13.401604 },
    { lat: 52.519942, lng: 13.402134 },
    { lat: 52.519724, lng: 13.402067 },
    { lat: 52.519549, lng: 13.402039 },
    { lat: 52.520140, lng: 13.402205 },
    { lat: 52.519899, lng: 13.402735 },
    { lat: 52.519681, lng: 13.402668 }
  ];
  let index = 0;
  setInterval(function() {
    const coordinate = coordinates[index];
    const position = {
      lat: coordinate.lat,
      lng: coordinate.lng
    };
    changeMarker(position);
    index = (index + 1) % coordinates.length;
  }, 1000);
}

function changeMarker(new_crds) {
  let crds = new google.maps.LatLng(new_crds.lat, new_crds.lng)
  markerLoc.setPosition(crds);
  circle.setCenter(crds);
  updateLocationInfo(new_crds.lat, new_crds.lng);

}

function initMap() {
  const stopButton = document.getElementById("stopButton");
  var audio1 = document.getElementById('audio1');
  var audio2 = document.getElementById('audio2');
  var center = {lat: 52.5209537, lng: 13.3865511};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
  let markerLoc;
  let circle;

  var marker1 = new google.maps.Marker({
    position: {lat: 52.519162568135144, lng: 13.401166963949985},
    map: map
  });
  var marker2 = new google.maps.Marker({
    position: {lat: 52.52135421233425, lng: 13.396890832463953},
    map: map
  });
  
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