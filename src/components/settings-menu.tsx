import "@/app/globals.css";
import { Luckiest_Guy } from "next/font/google";

const LuckiestGuy = Luckiest_Guy({
  weight: ["400"],
  subsets: ["latin"],
});

export const luckiestGuy = LuckiestGuy.className;

interface SettingsMenuProps {
  onDone?: () => void;
}

export function SettingsMenu({ onDone }: SettingsMenuProps) {
  return (
    <div
      className={`bg-[#BE945A] ${LuckiestGuy.className} flex flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute w-[40%] h-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h1
        className={`text-shadow absolute text-5xl left-1/2 -translate-x-1/2 -top-2`}
      >
        Settings
      </h1>
      <button onClick={onDone} className="border mb-2 mt-auto self-center w-[20%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-green-500 to-green-600 rounded-md">
        Done
      </button>
    </div>
  );
}
