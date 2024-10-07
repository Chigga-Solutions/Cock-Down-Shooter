"use client"

import { Menu } from "lucide-react";
import Image from 'next/image'

export default function Play() {
  return (
	<main className=""> 
    
    <Image className="cursor-pointer"
      src="/menu-btn.png"
      width={"128"}
      height={"128"}
      alt="menu button"
      
    />
	</main>
  );
}