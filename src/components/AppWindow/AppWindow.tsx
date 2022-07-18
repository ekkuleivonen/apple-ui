import {
  Component,
  createSignal,
  ComponentProps,
  Setter,
  Accessor,
} from "solid-js";
import styles from "./AppWindow.module.css";

interface AppWindowProps extends ComponentProps<any> {
  setVisibility?: Setter<boolean>;
}

const AppWindow: Component<AppWindowProps> = ({ visible, setVisibility }) => {
  const [isMoving, setIsMoving] = createSignal(false);
  const [isResizising, setIsResizing] = createSignal(false);
  const [isTracking, setIsTracking] = createSignal(false);
  const [currentEdge, setCurrentEdge] = createSignal("none");

  function moveWindow(e: MouseEvent) {
    if (isResizising()) return;

    const appWindow = document.getElementById("appWindow") as HTMLDivElement;
    const { left, top, bottom } = appWindow.getBoundingClientRect();

    if (top === 25 || bottom === 100) return;

    const cssVar = document.documentElement.style;
    const moverDiv = e.target;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    if (moverDiv) {
      dragMouseDown(e);
      setIsMoving(true);
      setIsTracking(true);
    }

    function dragMouseDown(e: MouseEvent) {
      const cssVar = (e = e || window.event);
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      cssVar.setProperty(
        "--safari-top",
        `${appWindow.getBoundingClientRect().top - pos2}px`
      );
      cssVar.setProperty(
        "--safari-left",
        `${appWindow.getBoundingClientRect().left - pos1}px`
      );
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      setIsMoving(false);
      setIsTracking(false);
    }
  }
  function resizeWindow(downEvt: MouseEvent) {
    if (isMoving()) return;

    //stop resizing on mouseup
    const stopResize = () => {
      setIsResizing(false);
      setIsTracking(false);
      window.removeEventListener("mousemove", resize);
    };
    window.addEventListener("mouseup", stopResize);

    const edges: string[] = ["top", "bottom", "left", "right"];
    const target = downEvt.target as HTMLElement;
    const cssVar = document.documentElement.style; //change this later
    const appWindow = document.getElementById("appWindow") as HTMLDivElement;
    if (!appWindow) {
      stopResize();
      throw new Error("Could not find appWindow");
    }

    //recognize the current edge
    const isValidEdge = edges.some((validEdge) =>
      target.id.includes(validEdge)
    );
    if (isValidEdge) setCurrentEdge(target.id);

    //resize the window on mousemove
    const resize = (moveEvt: MouseEvent) => {
      setIsResizing(true);
      setIsTracking(true);

      const appWindowPosition = appWindow.getBoundingClientRect();
      const { clientX, clientY } = moveEvt;

      //disallow resizing above the dock and menu
      if (appWindowPosition.top < 36) {
        stopResize();
        cssVar.setProperty("--safari-top", `${36}px`);
        return;
      }
      if (window.innerHeight - appWindowPosition.bottom < 100) {
        stopResize();
        cssVar.setProperty("--safari-top", `${appWindowPosition.top - 1}px`);
        return;
      }

      //disallow resizing too small
      if (appWindowPosition.width < 300) {
        stopResize();
        cssVar.setProperty("--safari-width", `${300}px`);
        return;
      }
      if (appWindowPosition.height < 300) {
        stopResize();
        cssVar.setProperty("--safari-height", `${300}px`);
        return;
      }

      switch (currentEdge()) {
        case "right":
          cssVar.setProperty(
            "--safari-width",
            `${clientX - appWindowPosition.left}px`
          );
          break;

        case "left":
          cssVar.setProperty("--safari-left", `${clientX}px`);
          cssVar.setProperty(
            "--safari-width",
            `${appWindowPosition.right - clientX}px`
          );
          break;

        case "bottom":
          cssVar.setProperty(
            "--safari-height",
            `${clientY - appWindowPosition.top}px`
          );
          break;

        case "top":
          cssVar.setProperty("--safari-top", `${clientY}px`);
          cssVar.setProperty(
            "--safari-height",
            `${appWindowPosition.bottom - clientY}px`
          );
          break;

        default:
          break;
      }
    };
    window.addEventListener("mousemove", resize);
  }
  function closeAppWindow() {
    if (setVisibility) return setVisibility(false);
    const appWindow = document.getElementById("appWindow") as HTMLDivElement;
    appWindow.style.visibility = "hidden";
  }

  return (
    <div class={styles.appWindow} id="appWindow">
      <div
        class={`${styles.trackerElements} ${
          isTracking() ? styles.isTracking : ""
        }`}
      >
        <div class={styles.mover} onmousedown={moveWindow} />
        <div
          class={`${styles.resizer} ${styles.left}`}
          id="left"
          onmousedown={resizeWindow}
        />
        <div
          class={`${styles.resizer} ${styles.top}`}
          id="top"
          onmousedown={resizeWindow}
        />
        <div
          class={`${styles.resizer} ${styles.right}`}
          id="right"
          onmousedown={resizeWindow}
        />
        <div
          class={`${styles.resizer} ${styles.bottom}`}
          id="bottom"
          onmousedown={resizeWindow}
        />
      </div>
      <div class={styles.withinTrackers}>
        <div class={styles.topBar}>
          <div class={styles.exit} onclick={closeAppWindow} />
          <div class={styles.minimize} />
          <div class={styles.maximize} />
        </div>

        <div class={styles.mainContent}>
          <img
            src="https://imgs.search.brave.com/q2cLuHe9POoNYQ9acZdbsfhp6hXuVi0-aLuZzQJN6Aw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/c2V0YXN3YWxsLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ny8wMy9NYWMtT3Mt/WC1BcHBsZS1XYWxs/cGFwZXItNTEyMHgy/ODgwLmpwZw"
            alt="temp"
          />
        </div>
      </div>
    </div>
  );
};

export default AppWindow;
