import { Component } from "solid-js";

import styles from "./NotificationBar.module.css";

export type Notification = {
  img_url: string;
  title: string;
  message: string;
  closeNotificationText: string;
  actionText2?: string;
  closeNotification: () => void;
  onAction?: () => void;
};

interface Props {
  notification: Notification;
}

const NotificationCard: Component<Props> = ({ notification }) => {
  console.log("notification", notification);

  const fadeIn = () => {
    setTimeout(() => {
      const notificationElement = document.getElementById("notification");
      if (notificationElement) {
        notificationElement.style.opacity = "1";
      }
    }, 50);
  };
  fadeIn();

  const fadeOut = () => {
    setTimeout(() => {
      const notificationElement = document.getElementById("notification");
      if (notificationElement) {
        notificationElement.style.opacity = "0";
      }
    }, 50);
  };

  const closeNotification = () => {
    fadeOut();
    setTimeout(() => {
      notification.closeNotification();
    }, 500);
  };

  return (
    <div
      class={styles.notification}
      id="notification"
      style={{ opacity: 0, transition: "opacity 0.5s" }}
    >
      <img
        src={notification.img_url}
        alt="none"
        class={styles.notificationImg}
      />
      <div class={styles.info}>
        <h3 class={styles.notificationTitle}>{notification.title}</h3>
        <p class={styles.notificationMessage}>{notification.message}</p>
      </div>
      <div class={styles.action} onClick={closeNotification}>
        <p class={styles.actionText}>{notification.closeNotificationText}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
