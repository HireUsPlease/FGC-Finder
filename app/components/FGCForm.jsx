import React, { useRef } from "react";
import styles from "./FGCForm.module.css";
import emailjs from "@emailjs/browser";

export const FGCForm = ({ isOpen, onClose }) => {
  const form = useRef();

  // might need to be client side, add X button or the ability to click out

  // passing in enviorment variables
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const emailPublicKey = process.env.NEXT_PUBLIC_EMAIL_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, emailPublicKey)
      // we dont need it to log to the console
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <form className={styles.form} ref={form} onSubmit={sendEmail}>
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
