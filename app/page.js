/**
 * The above function is a React component that represents the homepage of a website and includes a
 * search bar, a hero carousel, and a section displaying trending products.
 * @returns The HomePage component is returning a JSX element.
 */
import React from 'react'
import arrow_right from "../public/assets/icons/arrow-right.svg" 
import Image from 'next/image'
import SearchBar from '../Components/SearchBar'
import HeroCarousel from '../Components/HeroCarousel' 
import { getProductsList } from '../lib/actions/index'
import { Cards } from '../Components/Cards'

export default async function HomePage() {  
  
  const allProduct=await getProductsList()
  return (
    <>
    <section className='border-red-500 px-6 md:px-20 py-24 '>
      <div className="flex flex-col"> 
      <div className="flex items-center">
      <p className=''>Smart Shopping Karo aur Paise bachao</p>
      <Image src={arrow_right} width={21} height={21} />
      </div> 
      <p className='text-[3.2rem] py-3'>Track all the Prices with the Power of <span className='font-semibold text-primary'>PriceWatcher</span> </p>
       <p className='text-[1.15rem]'>Bring the products to our website and we will keep and eye 👁️ for you, and notify you when the price reduces</p>
    <SearchBar/>
    
      </div>

    </section>   
    <p className='text-[2.3rem] text-center'>Featured items</p>
    <div className="Carousel m-6 flex item-center justify-center">  
    
    <HeroCarousel/>
    </div> 


    <section className="trending">
    <p className='text-[1.8rem] py-5'>Trending</p>

      <div className="flex flex-wrap gap-x-8 gap-y-16 justify-center ">
     {
      allProduct.map((product)=>( 
        <Cards id={product._id} img={product.url} title={product.title} price={product.currency+""+product.currentPrice}/> ))
     }

      </div>
    </section>
 
    </>
  )
}
