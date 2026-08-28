"use client";

import { useEffect } from "react";

export function DevToolsProtection() {
  useEffect(() => {
    // Block common dev tools keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd + shift + C/I/J (dev tools shortcuts)
      if (mod && e.shiftKey && ["C", "I", "J"].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd + U (view source)
      if (mod && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd + S (save page)
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        return;
      }
    };

    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null;
}
