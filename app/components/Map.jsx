"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMap } from "../lib/state";
import styles from "./Map.module.css";

// this will be set based on the selected location from the google autofill
// const center = {
//   lat: 33.1983,
//   lng: -96.6389,
// };

// loads the map  
function Map() {
  // gets the searchResults from the context
  const { searchResults } = useMap();
  const { mapCenter } = useMap();
  const mapState = useMap();
  // sets the center to the center from the context
  const center = mapCenter;

  // maps the searchResults to only be the lat and the lng from each club from the db
  // this maps an array of points that will be used as pins on the map
  // i.e: [ { lat: 33.20094384868153, lng: -96.61299335774783 }, { lat: 33.038796264128074, lng: -96.732404318679 }, ]
  const geocodes = searchResults.map(result => ({
    lat: result.location.coordinates[1],
    lng: result.location.coordinates[0]
  }));

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // this used to set the bounds of the map view as well, it is now instead set with zoom={10}
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);
  // if the map is loaded, render it, otherwise load empty fractals
  return mapState.isLoaded ? (
    <GoogleMap
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
