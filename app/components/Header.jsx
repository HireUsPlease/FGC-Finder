"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { useForm } from "../lib/state";

function Header() {
  // context
  const { formIsOpen, updateFormState } = useForm();

  // update context on click
  const openForm = () => {
    updateFormState(formIsOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            fill
            src="/FGC_logo.png"
            alt="logo"
            objectFit="contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <h1 className={styles.pageTitle}>FIND YOUR FGC</h1>
      {/* this will be styled to match the aestetic of the page */}
      <button onClick={openForm} className={styles.button}>
        Add Your FGC
      </button>
    </div>
  );
}

export default Header;
