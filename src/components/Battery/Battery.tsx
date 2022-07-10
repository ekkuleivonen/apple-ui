import { Component, ComponentProps, createSignal, Show } from "solid-js";
import lowBatteryIcon from "../../assets/low-battery.svg";
import NotificationCard, {
  Notification,
} from "../NotificationBar/NotificationBar";
import styles from "./Battery.module.css";

interface BatteryProps extends ComponentProps<any> {
  // add props here
}

const Battery: Component<BatteryProps> = (props: BatteryProps) => {
  const [batteryLevel, setBatteryLevel] = createSignal<number>(77);
  const [showBatteryNotification, setShowBatteryNotification] =
    createSignal<boolean>(false);

  const lowBatteryNotification: Notification = {
    img_url: lowBatteryIcon,
    title: "Battery low",
    message: "Your battery is low. Please charge it.",
    closeNotificationText: "Close",
    closeNotification: () => {
      setShowBatteryNotification(false);
    },
  };

  const dechargeBattery = () => {
    const batteryLevelDiv = document.getElementById("batteryLevel");
    if (!batteryLevelDiv) return;

    if (batteryLevel() < 1) return; // TODO: "crash" the system if battery is already 0

    if (batteryLevel() <= 10) setShowBatteryNotification(true); // warn user about low battery

    setBatteryLevel(batteryLevel() - 1);
    let root = document.documentElement;
    root.style.setProperty("--battery-level", `${batteryLevel()}%`);
  };

  setInterval(dechargeBattery, 1000 * 10); // decharge battery every 10 seconds

  return (
    <>
      <div class={styles.menuItem}>
        <p>{`${batteryLevel()} %`}</p>
        <div class={styles.batteryShell}>
          <div class={styles.batteryLevel} id="batteryLevel" />
          <div class={styles.batteryKnob} />
        </div>
      </div>
      <Show when={batteryLevel() <= 10 && showBatteryNotification}>
        <NotificationCard notification={lowBatteryNotification} />
      </Show>
    </>
  );
};

export default Battery;
