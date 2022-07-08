import { Component, createSignal } from "solid-js";
import styles from "./menus.module.css";
import wifiIcon from "../../assets/wifi-icon.webp";
import lowBatteryIcon from "../../assets/low-battery.svg";
import Notification from "../Alert-popup/Notification";

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
      <Battery />
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

function Battery() {
  const [batteryLevel, setBatteryLevel] = createSignal<number>(77);

  const dechargeBattery = () => {
    if (batteryLevel() < 1) return; // don't decharge if battery is already empty
    //TODO: maybe trigger a warning if battery is low
    setBatteryLevel(batteryLevel() - 1);
    const batteryLevelDiv = document.getElementById("batteryLevel");
    if (batteryLevelDiv) batteryLevelDiv.style.width = `${batteryLevel()}%`;
  };

  setInterval(dechargeBattery, 1000 * 10);

  const notification = {
    img: lowBatteryIcon,
    title: "Battery low",
    message: "Your battery is low. Please charge it.",
    btnText: "Charge",
  };

  return (
    <>
      <div class={styles.menuItem}>
        <p>{`${batteryLevel()} %`}</p>
        <div class={styles.batteryShell}>
          <div class={styles.batteryLevel} id="batteryLevel" />
          <div class={styles.batteryKnob} />
        </div>
      </div>
      <Notification notification={notification} />
    </>
  );
}
