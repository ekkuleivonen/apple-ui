import { Component, createSignal } from "solid-js";
import styles from "./ToolBar.module.css";

import RightMenu from "../ToolBarMenus/RightMenu";
import LeftMenu from "../ToolBarMenus/LeftMenu";

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
