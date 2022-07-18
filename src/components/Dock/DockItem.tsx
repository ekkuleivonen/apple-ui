import { Component, ComponentProps, createEffect, Setter } from "solid-js";
import styles from "./DockItem.module.css";

export type DockItem = {
  img_url: string;
  title: string;
};

import { ToggleCollection } from "../Desktop/Desktop";
interface DockItemProps extends ComponentProps<any> {
  dockItem: DockItem;
  setvisibility?: ToggleCollection;
}

const DockItem: Component<DockItemProps> = ({
  dockItem,
  relativeMousePosition,
  setvisibility,
}) => {
  const openAppWindow = () => {
    if (!setvisibility) return;
    const setter = setvisibility.find(`set${dockItem.title}`);
    if (!setter) return;
    return setter(true);
  };

  //define relative position of the item to its parent

  const avoidMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.style.pointerEvents = "none";
    setTimeout(() => {
      target.style.pointerEvents = "auto";
    }, 20);
  };

  let oldDiff = 0;

  createEffect(() => {
    if (
      typeof relativeMousePosition !== "function" ||
      relativeMousePosition() === 0.5
    )
      return;
    const item = document.getElementById(dockItem.img_url) as HTMLElement;
    const dock = document.getElementById("dock") as HTMLElement;
    const dimensions = item.getClientRects();
    const itemCenter = item.offsetLeft + dimensions[0].width / 2;

    //calculate the relative position of the item center to the dock
    const relativeItemPosition =
      itemCenter / dock.getBoundingClientRect().width;
    let newDiff =
      Math.abs(relativeItemPosition) - Math.abs(relativeMousePosition());

    if (newDiff > 0 && newDiff < oldDiff)
      growIcon(item.getElementsByTagName("img")[0], Math.abs(newDiff - 1));

    if (newDiff > 0 && newDiff > oldDiff)
      shrinkIcon(item.getElementsByTagName("img")[0], Math.abs(newDiff - 1));

    if (newDiff < 0 && newDiff < oldDiff) {
      const reversedDiff =
        1 -
        (Math.abs(relativeMousePosition()) - Math.abs(relativeItemPosition));

      shrinkIcon(item.getElementsByTagName("img")[0], Math.abs(reversedDiff));
    }

    if (newDiff < 0 && newDiff > oldDiff) {
      const reversedDiff =
        1 -
        (Math.abs(relativeMousePosition()) - Math.abs(relativeItemPosition));

      growIcon(item.getElementsByTagName("img")[0], Math.abs(reversedDiff));
    }

    oldDiff = newDiff;
  });

  const growIcon = (item: HTMLImageElement, distance: number) => {
    item.style.height = `${
      50 *
      (distance * distance * distance * distance * distance * distance + 0.8)
    }px`;

    item.style.marginTop = `${
      distance * distance * distance * distance * distance * distance * -50
    }%`;

    item.style.marginLeft = `${
      distance * distance * distance * distance * distance * distance * -50
    }%`;
  };

  const shrinkIcon = (item: HTMLImageElement, distance: number) => {
    item.style.height = `${
      50 *
      (distance * distance * distance * distance * distance * distance + 0.8)
    }px`;

    item.style.marginTop = `${
      -distance * -distance * distance * distance * distance * distance * -50
    }%`;

    item.style.marginLeft = `${
      -distance * -distance * distance * distance * distance * distance * -50
    }%`;
  };

  return (
    <div
      class={styles.dockItem}
      onMouseMove={avoidMouseMove}
      onclick={openAppWindow}
      id={dockItem.img_url}
    >
      <img
        src={dockItem.img_url}
        alt={""}
        class={styles.dockIcon}
        id={dockItem.img_url}
      />
    </div>
  );
};

export default DockItem;
