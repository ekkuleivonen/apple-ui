import { Component, createSignal, Setter } from "solid-js";
import styles from "./Desktop.module.css";

import ToolBar from "../ToolBar/ToolBar";
import Dock from "../Dock/Dock";
import AppWindow from "../AppWindow/AppWindow";

export type ToggleCollection = {
  [key: string]: Setter<boolean>;
};

const Desktop: Component = () => {
  const [safari, setSafari] = createSignal(false);

  return (
    <div class={styles.desktop} onclick={() => setSafari(true)}>
      <ToolBar />
      {safari() && <AppWindow setVisibility={setSafari} />}
      <Dock />
    </div>
  );
};

export default Desktop;
