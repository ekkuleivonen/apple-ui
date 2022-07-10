import { Component, ComponentProps, createSignal } from "solid-js";
import styles from "./Dock.module.css";

import DockItem from "./DockItem";
import {
  contactsDockItem,
  notesDockItem,
  safariDockItem,
  finderDockItem,
  itermDockItem,
  trashDockItem,
} from "../../data/dock-items";

interface DockProps extends ComponentProps<any> {
  // add props here
}

//toggleDock size on hover
const toggleDockSize = (e: MouseEvent) => {
  const dock = e.currentTarget as HTMLElement;
  const currentWidth = dock.offsetWidth;
  if (dock.style.width === "" || dock.style.width === "auto")
    return (dock.style.width = `${currentWidth + 50}px`);
  return (dock.style.width = "auto");
};

const Dock: Component<DockProps> = (props: DockProps) => {
  return (
    <div
      class={styles.dock}
      id="dock"
      onMouseEnter={toggleDockSize}
      onMouseLeave={toggleDockSize}
    >
      <DockItem dockItem={finderDockItem} />
      <DockItem dockItem={notesDockItem} />
      <DockItem dockItem={safariDockItem} />
      <DockItem dockItem={itermDockItem} />
      <DockItem dockItem={contactsDockItem} />
      <div class={styles.divider} />
      <DockItem dockItem={trashDockItem} />
    </div>
  );
};

export default Dock;
