// Ubicacion del usuario y la ubicacion definida por defecto
// mi.lg, mi.lt definida por defecto
const initial = { lg: 0, lt: 0 };
const actual = { lg: 0, lt: 0 };

const dom = {
  miLg: document.querySelector(".initial-lg"),
  miLt: document.querySelector(".initial-lt"),

  yourLg: document.querySelector(".actual-lg"),
  yourLt: document.querySelector(".actual-lt"),

  distance: document.querySelector(".distancia")
}

const getInitialUbicacion = () => {
  if (!navigator.geolocation) return alert("La ubicación no esta disponible.");

  navigator.geolocation.getCurrentPosition((position) => {
    initial.lt = position.coords.latitude;
    initial.lg = position.coords.longitude;
  }); 
};


const getYourUbication = () => {
  if (!navigator.geolocation) return alert("La ubicación no esta disponible");

  navigator.geolocation.getCurrentPosition((position) => {
    const lt = position.coords.latitude;
    const lg = position.coords.longitude;

    actual.lg = lg;
    actual.lt = lt;
  });
};

const printInfoUbication = () => {
  dom.miLg.innerHTML = initial.lg;
  dom.miLt.innerHTML = initial.lt;

  dom.yourLg.innerHTML = actual.lg;
  dom.yourLt.innerHTML = actual.lt;

  const distance = getDistance();
  dom.distance.innerHTML = `${distance} m`;
};

const getDistance = () => {
  var R = 6371e3; // radio de la Tierra en metros
  var lat1 = initial.lt * Math.PI / 180; // convertir a radianes
  var lat2 = actual.lt * Math.PI / 180;
  var deltaLat = (initial.lt - actual.lt) * Math.PI / 180;
  var deltaLon = (initial.lg - actual.lg) * Math.PI / 180;

  var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distancia = R * c; // en metros
  return distancia;
};




getInitialUbicacion();

setInterval(() => {
  getYourUbication();
  printInfoUbication();
}, 1000);

printInfoUbication();
