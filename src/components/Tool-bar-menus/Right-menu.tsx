import { Component, createSignal } from "solid-js";
import styles from "./menus.module.css";
import wifiIcon from "../../assets/wifi-icon.webp";

const RightMenu: Component = () => {
  const [dateTime, setDateTime] = createSignal<string | null>(null);

  const getDateTime = () => {
    const dateString = new Date().toLocaleString("en-GB", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    //replace commas with dots
    const dateTimeString = dateString.replaceAll(",", ".");
    setDateTime(dateTimeString);
  };
  getDateTime();
  //update every minute
  setInterval(getDateTime, 60000);

  return (
    <div class={styles.rightMenu}>
      <img
        src={wifiIcon}
        alt="wifi icon"
        class={`${styles.menuItem} ${styles.wifiIcon}`}
      />
      <p class={styles.menuItem}>{dateTime()}</p>
    </div>
  );
};

export default RightMenu;
