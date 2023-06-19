"use client";

import { usePlacesWidget } from "react-google-autocomplete";
import { useMap } from "../lib/state";
import styles from "./SearchBox.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SearchBox = () => {

  const mapState = useMap();

  if (mapState.isLoaded) {
    return <SearchBoxImpl mapUrl={mapState.url} />
  }
}

const SearchBoxImpl = ({ mapUrl }) => {

  const { ref } = usePlacesWidget({
    googleMapsScriptBaseUrl: mapUrl,
    onPlaceSelected: (place) => {
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        // this is the geocode from the searched location, right now it just console logs
        console.log(`${lat()}, ${lng()}`);
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
