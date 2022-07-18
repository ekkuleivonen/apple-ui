import {
  Component,
  ComponentProps,
  createEffect,
  createSignal,
  For,
  Setter,
} from "solid-js";
import styles from "./Dock.module.css";

import DockItem from "./DockItem";
import dockItems, { binDockItem } from "../../data/dock-items";

import { ToggleCollection } from "../Desktop/Desktop";
interface DockProps extends ComponentProps<any> {
  toggleCollection?: ToggleCollection;
}

const [relativeMousePosition, setRelativeMousePosition] = createSignal(0.5);

const Dock: Component<DockProps> = ({ setVisibility }: DockProps) => {
  const magnify = (e: MouseEvent) => {
    //calculate the relative position of the mouse
    const target = e.target as HTMLElement;
    if (target.id !== "dock") return;
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeMousePosition = mouseX / rect.width;
    if (relativeMousePosition > 1 || relativeMousePosition < 0) return;
    setRelativeMousePosition(relativeMousePosition);
  };
  createEffect(() => {
    const dock = document.getElementById("dock") as HTMLElement;
    const renderedDockItems = [...dock.children] as HTMLElement[];
    renderedDockItems.forEach((item, idx) => {
      const dimensions = item.getClientRects();
      const itemCenter = item.offsetLeft + dimensions[0].width / 2;
      //calculate the relative position of the item center to the dock
      const relativeItemPosition =
        itemCenter / dock.getBoundingClientRect().width;
    });
  });
  const resetDock = () => {
    const dock = document.getElementById("dock") as HTMLElement;
    dock.style.width = "";
    const icons = dock.querySelectorAll("img");
    icons.forEach((icon) => {
      icon.style.height = "50px";
      icon.style.marginTop = "0px";
      icon.style.marginLeft = "0px";
    });
  };
  const activateDock = () => {
    const dock = document.getElementById("dock") as HTMLElement;
    const oldWidth = dock.getClientRects()[0].width;
    dock.style.width = `${oldWidth + 30}px`;
  };

  return (
    <div
      class={styles.dock}
      id="dock"
      onMouseMove={magnify}
      onMouseLeave={resetDock}
      onMouseEnter={activateDock}
    >
      <For each={dockItems}>
        {(dockItem: any) => (
          <DockItem
            dockItem={dockItem}
            relativeMousePosition={relativeMousePosition}
            id={dockItem.img_url}
            setVisibility={setVisibility}
          />
        )}
      </For>
      {/* <div class={styles.divider} /> */}
      <DockItem
        dockItem={binDockItem}
        relativeMousePosition={relativeMousePosition}
        id={binDockItem.img_url}
      />
    </div>
  );
};

export default Dock;
