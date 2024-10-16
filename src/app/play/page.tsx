"use client";

import { PauseButton } from "@/components/pause-button";
import { PauseMenu } from "@/components/pause-menu";
import { useState } from "react";

export default function Play() {

  /* Game-global states */
  const [paused, setPaused] = useState(false);

  return (
    <main className="cursor-crosshair bg-white h-screen">
      {
        paused && 
          <>
            <PauseMenu />
            <div className='pointer-events-all bg-[#000000d9] fixed top-0 w-full h-full' />
          </>
      }
      <PauseButton />
    </main>
  )
}