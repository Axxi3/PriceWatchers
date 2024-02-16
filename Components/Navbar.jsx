/* The code you provided is a React component called `Navbar`. It is a functional component that
renders a header with a navigation bar. */
import Link from 'next/link'
import React from 'react'
import search from "../public/assets/icons/search.svg" 
import heart from "../public/assets/icons/black-heart.svg"
import user from "../public/assets/icons/user.svg"
import Image from 'next/image'
export default function Navbar() {    
    const images=[search,heart,user]
   
  return (
    <header className="w-full p-5">
      <nav className='flex item-center justify-between'>
        <Link href="/">
          <p className="font-semibold text-3xl">
            Price<span className="text-primary">Watcher</span>
          </p>
        </Link>

        <div className="flex gap-4">
         {
            images.map((icon,index)=>( 
                <Image 
                key={index}
                src={images[index]}
                width={30}
                height={30} 
                className='object-contain'/>
            ))
         }
        </div>
      </nav>
    </header>
  );
}
