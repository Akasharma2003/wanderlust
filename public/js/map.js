let res = coordinates.split(",");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: res, // starting position [lng, lat]
    zoom: 9 // starting zoom
});


// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(res)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h5>${listing.toUpperCase()}</h5><p>Exact location will be provide after booking</p>`)
    )
    .addTo(map);