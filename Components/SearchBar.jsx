/**
 * The SearchBar component is a form that allows users to enter an Amazon product link and submit it
 * for scraping and storing the product information.
 * @returns The code is returning a React functional component called SearchBar.
 */
"use client"
import { scrapeAndStroreProduct } from '../lib/actions/index';
import React, { FormEvent,useState } from 'react';

export default function SearchBar() {   
  const isValidAmazonProductURL=()=>{ 
    const pattern = /^(?:https?:\/\/)?(?:[^./?#]+\.)?(?:amazon)\.(?:com|ca|co\.uk|de|fr|it|es|com\.au|com\.br|cn|in|jp|com\.mx|nl|se|sg)(?:\/|$)/i;
    if (pattern.test(seatchPrompt)) {
    return true
  } else {
      return false
  }
  } 
  const [loading, setloading] = useState(false)
  const [seatchPrompt,setSearchPrompt]=useState("")
  const handleSubmit = async (event) => { 
    event.preventDefault();

    if(isValidAmazonProductURL){ 
        try {
          setloading(true) 
          const product=await scrapeAndStroreProduct(seatchPrompt)  
          console.log("started")
        } catch (error) {
          console.log(error)
        } finally{ 
          setloading(false) 
          console.log("ended")
        }



    }else{ 
      alert("not a valid amazon link")
    }
  };

  return (
    <form className="search p-5 mx-auto w-[100%] flex md:flex-row flex-col items-center justify-center gap-4 mt-5" onSubmit={handleSubmit}>
      <input type="search" name="searcher" placeholder='Enter product Link' className='h-[50px] w-[70%] px-6 shadow-lg' value={seatchPrompt} onChange={(e)=>setSearchPrompt(e.target.value)}/>
      <button type="submit" className=' searchbar-btn h-[50px] rounded-[10px]' disabled={seatchPrompt===""}>Search</button>
    </form> 
  );
}
