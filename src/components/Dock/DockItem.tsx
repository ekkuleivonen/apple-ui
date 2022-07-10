import { Component, ComponentProps } from "solid-js";
import styles from "./DockItem.module.css";

type DockItem = {
  img_url: string;
  title: string;
};

interface DockItemProps extends ComponentProps<any> {
  dockItem: DockItem;
}

const growDockItem = (e: MouseEvent) => {
  const dockItem = e.currentTarget as HTMLElement;
  console.log(dockItem);
  if (dockItem.style.transform === "scale(1.2)") {
    dockItem.style.transform = "scale(1)";
    dockItem.style.marginBottom = "0px";
    return;
  } else {
    dockItem.style.transform = "scale(1.2)";
    dockItem.style.marginBottom = "40px";
    return;
  }
};

const DockItem: Component<DockItemProps> = ({ dockItem }) => {
  return (
    <div
      class={styles.dockItem}
      onMouseEnter={growDockItem}
      onMouseLeave={growDockItem}
    >
      <img src={dockItem.img_url} alt="" class={styles.dockIcon} />
    </div>
  );
};

export default DockItem;
