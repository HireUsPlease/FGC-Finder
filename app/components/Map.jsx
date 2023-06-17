"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Map.module.css";

// this will be set based on the selected location from the google autofill
const center = {
  lat: 33.1983,
  lng: -96.6389,
};

// these will be set based on $near in comparison to the center
const geocodes = [
  { lat: 33.20094384868153, lng: -96.61299335774783 },
  { lat: 33.038796264128074, lng: -96.732404318679 },
];

// loads the map
function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
  });

  const [map, setMap] = useState(null);

  // we need to set bounds based on the center in a radius, that way the map doesnt zoom all the way in
  const onLoad = useCallback(function callback(map) {
    // this sets the bounds to be just the center coordinates we pass in, its what I used for testing
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  // if the map is loaded, render it, otherwise load empty fractals
  return isLoaded ? (
    <GoogleMap
      // mapContainerStyle={containerStyle}
      mapContainerClassName={styles.container}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {geocodes.map((geocode, index) => (
        <Marker key={index} position={geocode} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
