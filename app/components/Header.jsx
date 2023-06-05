import Image from "next/image";
import styles from "./Header.module.css"

function Header() {
  return (
    <div className={styles.header}>
      <Image src="/logo_temp.png" alt="logo" width="200" height="100"/>
      <h1 className={styles.pageTitle}>Page Title</h1>
    </div>
  )
}

export default Header;
