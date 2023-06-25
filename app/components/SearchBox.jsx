"use client";

import { usePlacesWidget } from "react-google-autocomplete";
import { useMap } from "../lib/state";
import { useRouter } from "next/navigation";
import styles from "./SearchBox.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SearchBox = () => {

  const mapState = useMap();

  if (mapState.isLoaded) {
    return <SearchBoxImpl mapUrl={mapState.url} />
  }
}

const SearchBoxImpl = ({ mapUrl }) => {
  const router = useRouter();
  const { updateSearchResults } = useMap();
  const { updateMapCenter } = useMap();
  // function to fetchData, is called in "onPlaceSelected" in the autofill
  const fetchData = async (lat, lng, distanceValue, gamesValue) => {
    try {

      // Sets the base URL for the api call
      let url = `/api/search?lng=${lng}&lat=${lat}&distance=${distanceValue}`

      // if games were selected, concat the games to the url
      if (gamesValue) {
        url += `&games=${gamesValue}`
      }
      const response = await fetch(url);
      const data = await response.json();
      // if there are results, update them in the context
      if (response.ok) {
        updateMapCenter({
          lat: lat,
          lng: lng,
        })
        updateSearchResults(data.searchResults);
        router.push('/search');
      // this just console logs the error
      // but it should be changed to either update the context to be empty
      // and go to the search page still, and just show no results
      } else {
        console.error(data.error);
      }
    // if an error occurs in the fetch with the api, it should probably show a message
    // along the lines of an error occurs
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const { ref } = usePlacesWidget({
    googleMapsScriptBaseUrl: mapUrl,
    onPlaceSelected: (place) => {
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;

        // right now the geocode is hardcoded here for testing
        // it lets me double check that $near is working with what I have in my DB
        // fetchData(33.566, 35.122, 50);

        // 50 is set to default distance right now
        // fetchData takes in 4 parameters, lat, lng, distance, and games if applicable
        // games can be passed in here as an array, we dont have any UI for filtering it right now,
        // but that can be easily tested
        // let gamesValue = ["Street Fighter 6", ]
        fetchData(lat(), lng(), 50);
      }
    }
  });

  // I somehow need this to just run the google api,
  // like if they manually type out their whole address and press enter instead of clicking one of the autocompletes
  // this applies to hitting the search button as well
  // and I cannot for the life of me figure out how to do it without typing some jank code
  // I can probably use window.google.maps.geoCoder(), and pass in the address but that would
  // require @googlemaps/js-api-loader, and more boilerplate. So if a work around can be found,
  // I will find it...
  function handleSubmit(e) {
    e.preventDefault();
    let inputLocation = document.getElementById("location");
    console.log(inputLocation.value);
  }

    return (
      <div className={styles.searchContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.searchBox}>
            <div className={styles.locationIcon}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <input
              ref={ref}
              placeholder="City, Address, Postal Code, or Region"
              id="location"
            />
          </div>
        </form>
        <button type="button" aria-label="Search Button" onClick={handleSubmit}>
          <span className={styles.searchIcon}>
            <i className="fas fa-search"></i>
          </span>
        </button>
      </div>
    );
};

export default SearchBox;
