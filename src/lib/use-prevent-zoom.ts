'use effect';

import { useEffect } from "react";

export default function usePreventZoom() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.keyCode == 61 ||
        e.keyCode == 107 ||
        e.keyCode == 173 ||
        e.keyCode == 109 ||
        e.keyCode == 187 ||
        e.keyCode == 189)) 
      {
          e.preventDefault();
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("wheel", handleWheel, { passive: false });
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("wheel", handleWheel);
      };
  }, [])
}