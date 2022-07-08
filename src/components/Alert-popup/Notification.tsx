import { Component, ComponentProps, createSignal } from "solid-js";

import styles from "./Notification.module.css";

interface Notification {
  notification: {
    img: string;
    title: string;
    message: string;
    btnText?: string;
    onClose?: () => void;
  };
}

const Notification: Component = ({
  notification: { img, title, message, btnText, onClose },
}: Notification) => {
  return (
    <div class={styles.notification}>
      <img src={img} alt="none" class={styles.notificationImg} />
      <div class={styles.info}>
        <h3 class={styles.notificationTitle}>{title}</h3>
        <p class={styles.notificationMessage}>{message}</p>
      </div>
      <div class={styles.action}>
        <p class={styles.notificationBtn}>{btnText}</p>
      </div>
    </div>
  );
};

export default Notification;
