"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Play() {

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        console.log('timer gone');
        
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  return (
	<main> 
    
    <Image className={`cursor-pointer ${clicked ? 'scale-110' : 'hover:scale-105'} w-[5vw] h-[5vw] transition-transform`}
        src="/menu-btn.png"
        onClick={(e) => {
          setClicked(true);
        }}
        width={"256"}
        height={"256"}
        alt="ERR:FNF"
      />
	</main>
  );
}