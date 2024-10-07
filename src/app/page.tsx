"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
	<main className="flex justify-center items-center h-screen flex-col"> 
    <h1 className="font-bold">Cock Down Shooter</h1>
    <button onClick={() => {router.push("/play")}}>Play</button>
    <button>Settings</button>
	</main>
  );
}
