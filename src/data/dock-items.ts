import contactsIcon from "../assets/contacts-icon.png";
import notesIcon from "../assets/notes-icon.png";
import safariIcon from "../assets/safari-icon.png";
import finderIcon from "../assets/finder-icon.png";
import itermIcon from "../assets/iterm-icon.png";
import binIcon from "../assets/trash-icon.png";

import type { DockItem } from "../components/Dock/DockItem";

const dockItems: DockItem[] = [
  { img_url: contactsIcon, title: "Contacts" },
  { img_url: notesIcon, title: "Notes" },
  { img_url: safariIcon, title: "Safari" },
  { img_url: finderIcon, title: "Finder" },
  { img_url: itermIcon, title: "iTerm" },
];

export default dockItems;

export const binDockItem = {
  img_url: binIcon,
  title: "Bin",
};
