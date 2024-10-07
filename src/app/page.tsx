"use client"
//change hover color depending on background color scheme
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
	<main className="flex justify-center items-center h-screen flex-col"> 
    <h1 className="font-bold text-[4vw]">Cock Down Shooter</h1>
    <button onClick={() => {router.push("/play")}} className="border-[0.2vw] rounded-[0.5vw] w-[12vw] h-[5vw] text-[3vw] hover:bg-green-800">Play</button>
    <button className="border-[0.2vw] rounded-[0.5vw] w-[10vw] h-[4vw] text-[2vw] mt-[1vw] hover:bg-green-700">Settings</button>
    
    
	</main>
  );
}
