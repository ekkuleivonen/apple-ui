import { Component } from "solid-js";
import styles from "./menus.module.css";
import appleLogo from "../../assets/apple-logo.webp";

const LeftMenu: Component = () => {
  return (
    <div class={styles.leftMenu}>
      <img src={appleLogo} alt="small apple logo" class={styles.menuItem} />
      <p class={`${styles.menuItem} ${styles.itemHighlight}`}>Finder</p>
      <p class={styles.menuItem}>File</p>
      <p class={styles.menuItem}>Edit</p>
      <p class={styles.menuItem}>View</p>
      <p class={styles.menuItem}>Go</p>
    </div>
  );
};

export default LeftMenu;
