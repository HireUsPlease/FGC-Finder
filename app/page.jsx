import { FGCForm } from "./components/FGCForm";
import SearchBox from "./components/SearchBox";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <FGCForm />
      <SearchBox />
    </main>
  );
}
