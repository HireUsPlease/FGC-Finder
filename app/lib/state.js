"use client";

// remember to remove useEffect
// useEffect is here to give me feedback that the context was updating
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoadScript } from "@react-google-maps/api";

export const MapContext = createContext();
const { Provider } = MapContext;

export const useMap = () => useContext(MapContext);

const libraries = ['places'];

export default function MapProvider(props) {
  // initial state of the search results
  const [searchResults, setSearchResults] = useState([]);
  // state for the map center
  const [mapCenter, setMapCenter ] = useState({});

  const { isLoaded, loadError, url } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
    id: 'google-map',
    libraries,
  });

  // the function that can be called in components 
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };
  // the function that can be called in components for udpating the center
  const updateMapCenter = (results) => {
    setMapCenter(results);
  }

  // remove this later, this is for making sure the context was updating correctly
  // useEffect(() => {
  //   console.log('Search Results:', searchResults);
  // }, [searchResults]);

  const initialState = {
    isLoaded,
    loadError,
    url,
    searchResults,
    updateSearchResults,
    mapCenter,
    updateMapCenter,
  };

  return <Provider value={initialState} {...props} />;
  }
