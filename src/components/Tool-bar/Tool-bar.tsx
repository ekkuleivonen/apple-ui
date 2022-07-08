import { Component, createSignal } from "solid-js";
import styles from "./Tool-bar.module.css";

import RightMenu from "../Tool-bar-menus/Right-menu";
import LeftMenu from "../Tool-bar-menus/Left-menu";

const ToolBar: Component = () => {
  const [windowWidth, setWindowWidth] = createSignal<number>(window.innerWidth);
  window.onresize = () => setWindowWidth(window.innerWidth);

  return (
    <div class={styles.toolBar}>
      <LeftMenu />
      {windowWidth() > 600 && <RightMenu />}
    </div>
  );
};

export default ToolBar;
