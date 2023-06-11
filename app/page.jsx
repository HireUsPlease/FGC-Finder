import Image from "next/image";
import SearchBox from "./components/SearchBox";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchBox />
      {/* this image can be changed pretty easily, however it seems like this
      format for loading images is the most optimized for Next, better than
      setting it in the CSS */}
      <Image
        className={styles.image}
        src="/AT_CD_04.png"
        loading="lazy"
        fill={true}
        objectFit="cover"
        alt="Picture of the author"
      />
    </main>
  );
}
