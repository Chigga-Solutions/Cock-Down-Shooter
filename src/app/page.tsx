"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SquareX } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  return (
    <main className="flex justify-center items-center h-screen flex-col bg-[url(/bg_main.png)] bg-cover">
      <h1 className="font-bold text-[5vw] text-red-600">Cock Down Shooter</h1>
      <button
        onClick={() => {
          router.push("/play");
        }}
        className="border-[0.4vw] rounded-[0.6vw] w-[15vw] h-[6vw] text-[3vw] bg-black hover:bg-green-800 font-bold"
      >
        Play
      </button>
      <button
        onClick={handleClick}
        className="border-[0.4vw] rounded-[0.6vw] w-[12.5vw] h-[4vw] text-[2vw] mt-[1vw] bg-black hover:bg-green-700 font-bold"
      >
        Settings
      </button>
      <div
        className={`absolute bg-black w-[40vw] h-[40vw] flex rounded-[1vw] ${
          isClicked ? "flex" : "hidden"
        }`}
      >
        <div className="w-[40vw] h-[5vw] flex justify-between items-center p-[1vw] border-b-[0.5vw]">
          <p className="text-white text-[3vw] text-center">Settings Panel</p>
          <button onClick={handleClick} className="">
            <SquareX size={48} />
          </button>
        </div>
      </div>
    </main>
  );
}
