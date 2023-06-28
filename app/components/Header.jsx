import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/FGC_logo.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </Link>
      </div>
      <h1 className={styles.pageTitle}>FIND YOUR FGC</h1>
    </div>
  );
}

export default Header;
