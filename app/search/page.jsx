import ClubList from "../components/ClubList";
import { FGCForm } from "../components/FGCForm";
import Map from "../components/Map";
import SearchBox from "../components/SearchBox";
import styles from "./page.module.css";

export default function Search() {
  return (
    <main className={styles.main}>
      <FGCForm />
      <SearchBox />
      <div className={styles.info}>
        <ClubList />
        <div className={styles.mapContainer}>
          <Map />
        </div>
      </div>
    </main>
  );
}
