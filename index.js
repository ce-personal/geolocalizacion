// Ubicacion del usuario y la ubicacion definida por defecto
// mi.lg, mi.lt definida por defecto
const mi = { lg: -86.19243794548086, lt: 12.106482054519146 };
const your = { lg: 0, lt: 0 };

const dom = {
  miLg: document.querySelector(".mi-lg"),
  miLt: document.querySelector(".mi-lt"),

  yourLg: document.querySelector(".your-lg"),
  yourLt: document.querySelector(".your-lt"),

  distance: document.querySelector(".distancia")
}

const getYourUbication = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(function(position) {
    const lt = position.coords.latitude;
    const lg = position.coords.longitude;

    your.lg = lg;
    your.lt = lt;

    printInfoUbication();
  });
};

const printInfoUbication = () => {
  dom.miLg.innerHTML = mi.lg;
  dom.miLt.innerHTML = mi.lt;

  dom.yourLg.innerHTML = your.lg;
  dom.yourLt.innerHTML = your.lt;

  const distance = getDistance();
  dom.distance.innerHTML = `${distance} m`;
};

const getDistance = () => {
  var R = 6371e3; // radio de la Tierra en metros
  var lat1 = mi.lt * Math.PI / 180; // convertir a radianes
  var lat2 = your.lt * Math.PI / 180;
  var deltaLat = (mi.lt - your.lt) * Math.PI / 180;
  var deltaLon = (mi.lg - your.lg) * Math.PI / 180;

  var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distancia = R * c; // en metros
  return distancia;
};




getYourUbication();
