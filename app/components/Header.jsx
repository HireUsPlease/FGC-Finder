"use client"

import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";
import { FGCForm } from "./FGCForm";

function Header() {
  const [formIsOpen, setFormIsOpen] = useState(false);

  const openForm = () => {
    setFormIsOpen(true);
  };

  const closeForm = () => {
    setFormIsOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        {/* <Link href="/"> */}
          <Image
            fill
            src="/FGC_logo.png"
            alt="logo"
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        {/* </Link> */}
      </div>
      <h1 className={styles.pageTitle}>FIND YOUR FGC</h1>
      <button onClick={openForm}>Yeet</button>
      <FGCForm isOpen={formIsOpen} onClose={closeForm} />
    </div>
  );
}

export default Header;
