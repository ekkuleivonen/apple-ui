import type { Component } from "solid-js";
import styles from "./Desktop.module.css";

import ToolBar from "../ToolBar/ToolBar";
import Dock from "../Dock/Dock";

const Desktop: Component = () => {
  return (
    <div class={styles.desktop}>
      <ToolBar />
      <Dock />
    </div>
  );
};

export default Desktop;
