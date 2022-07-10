import type { Component } from "solid-js";
import styles from "./Desktop.module.css";

import ToolBar from "../ToolBar/ToolBar";
import Dock from "../Dock/Dock";
import Safari from "../Safari/Safari";

const Desktop: Component = () => {
  return (
    <div class={styles.desktop}>
      <ToolBar />
      <Safari />
      <Dock />
    </div>
  );
};

export default Desktop;
