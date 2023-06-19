"use client";

import React, { createContext, useContext } from 'react';
import { useLoadScript } from "@react-google-maps/api";

export const MapContext = createContext();
const { Provider } = MapContext;

export const useMap = () => useContext(MapContext);

const libraries = ['places'];

export default function MapProvider(props) {
  const { isLoaded, loadError, url } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
    id: 'google-map',
    libraries,
  });

  const initialState = {
    isLoaded,
    loadError,
    url
  };

  return <Provider value={initialState} {...props} />;
}
