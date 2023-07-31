"use client";

import styles from "./FGCForm.module.css";
import { useForm } from "../lib/state";

export const FGCForm = () => {
  const { formIsOpen } = useForm();

  if (!formIsOpen) return null;

  return (
    // this needs to be stylizied and contain relevent data, this is an example placeholder for now
    <div className={styles.modal}>
      <form className={styles.form}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
