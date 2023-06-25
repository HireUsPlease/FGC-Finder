import styles from "./Footer.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


function Footer() {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/NTumminaro" target="_blank">
        <i className="fab fa-github"></i>
        NTumminaro
      </a>
      <a href="https://github.com/aarbrown" target="_blank">
        <i className="fab fa-github"></i>
        aarbrown
      </a>
      <a href="https://github.com/Sealcakes" target="_blank">
        <i className="fab fa-github"></i>
        SealCakes
      </a>
      <a href="https://github.com/gabess3" target="_blank">
        <i className="fab fa-github"></i>
        gabess3
      </a>
    </div>
  );
}

export default Footer;
