import type { Component } from "solid-js";
import styles from "./Desktop.module.css";

import ToolBar from "../Tool-bar/Tool-bar";

const Desktop: Component = () => {
  return (
    <div class={styles.desktop}>
      <ToolBar />
    </div>
  );
};

export default Desktop;
