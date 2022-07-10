import { Component, createEffect, createSignal, Show } from "solid-js";
import styles from "./Safari.module.css";

const [url, setUrl] = createSignal("https://www.wikipedia.org/");

createEffect(() => {
  const safariWindow = document.querySelector(
    "#safari-window"
  ) as HTMLDivElement;
  if (safariWindow) {
    let mouseDown = false;
    safariWindow.addEventListener("mouseup", () => (mouseDown = false));
    safariWindow.addEventListener("mousedown", () => (mouseDown = true));
    safariWindow.addEventListener("mousemove", () => {
      if (mouseDown) {
        safariWindow.style.cursor = "grabbing";
      } else {
        safariWindow.style.cursor = "grab";
      }
    });
  }
});

const Safari: Component = () => {
  return (
    <div class={styles.safariWindow} id="safari-window">
      <div class={styles.topBar}>
        <div class={styles.exit} />
        <div class={styles.minimize} />
        <div class={styles.maxizimze} />
      </div>

      <iframe src={url()} class={styles.iFrame} />
    </div>
  );
};

export default Safari;
