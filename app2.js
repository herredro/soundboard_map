const MAX_AGE = 100;

// Function to play an audio element
function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  audio.play();
}

// Function to set the marker and accuracy circle on the map
function setMarker(map, crds) {
  const marker = new google.maps.Marker({
    position: { lat: crds.lat, lng: crds.lng },
    map: map,
    title: "Your Location",
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
  });

  const circle = new google.maps.Circle({
    map: map,
    radius: crds.acc, // show accuracy circle around the user's location
    center: new google.maps.LatLng(crds.lat, crds.lng),
    fillColor: "#007bff",
    fillOpacity: 0.2,
    strokeColor: "#007bff",
    strokeOpacity: 0.3,
    strokeWeight: 2,
  });

  return { marker, circle };
}

// Function to initialize the user's geolocation and set the marker on the map
function initGeo(map) {
  const options = {
    timeout: 10000,
    maximumAge: MAX_AGE,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const { marker, circle } = setMarker(map, {
      lat: crd.latitude,
      lng: crd.longitude,
      acc: crd.accuracy,
    });

    actualChange(map, marker, circle);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// Function to update the user's location marker and accuracy circle
function actualChange(map, marker, circle) {
  const options = {
    timeout: 10000,
    maximumAge: MAX_AGE,
  };

  setInterval(function () {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        marker.setPosition(newCoords);
        circle.setCenter(newCoords);
      },
      error,
      options
    );
  }, 1000);
}

// Function to initialize the map and its markers
function initMap() {
  const center = { lat: 52.5209537, lng: 13.3865511 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: center,
  });

  const marker1 = new google.maps.Marker({
    position: { lat: 52.519162568135144, lng: 13.401166963949985 },
    map: map,
  });
  const marker2 = new google.maps.Marker({
    position: { lat: 52.52135421233425, lng: 13.396890832463953 },
    map: map,
  });

  const stopButton = document.getElementById("stopButton");
  const audio1 = document.getElementById("audio1");
  const audio2 = document.getElementById("audio2");

  // Add click event listeners to the markers
  marker1.addListener("click", function () {
    playAudio("audio1");
  });

  marker2.addListener("click", function () {
    playAudio("audio2");
  });

  // Add click event listener to the stop button
  stopButton.addEventListener("click", function () {
    audio1.pause();
    audio1.currentTime = 0;
    audio2.pause();
    audio2.currentTime = 0;
  });

  initGeo(map);
}
