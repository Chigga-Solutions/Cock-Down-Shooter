"use client"
//change hover color depending on background color scheme
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
	<main className="flex justify-center items-center h-screen flex-col"> 
    <h1 className="font-bold text-[5vw] text-red-600">Cock Down Shooter</h1>   
    <button onClick={() => {router.push("/play")}} className="border-[0.4vw] rounded-[0.6vw] w-[15vw] h-[6vw] text-[3vw] hover:bg-green-800 font-bold">Play</button>
    <button className="border-[0.4vw] rounded-[0.6vw] w-[12.5vw] h-[4vw] text-[2vw] mt-[1vw] hover:bg-green-700 font-bold">Settings</button>
    
    
	</main>
  );
}
