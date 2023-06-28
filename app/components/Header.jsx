import Image from "next/image";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo_temp.png" alt="logo" width="200" height="60" />
      </div>
      <h1 className={styles.pageTitle}>FIND YOUR LOCALS</h1>
    </div>
  );
}

export default Header;
