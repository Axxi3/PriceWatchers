/* The code you provided is a React component called "HeroCarousel". It imports necessary dependencies
such as React, react-responsive-carousel, and next/image. It also defines an array called
"SampleImages" which contains objects with image URLs and alt text. */
"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";


const SampleImages=[
    {imgUrl:"/assets/images/hero-1.svg" ,alt:"smartwatch"},
    {imgUrl:"/assets/images/hero-2.svg" ,alt:"bag"},
    {imgUrl:"/assets/images/hero-3.svg" ,alt:"lamp"},
    {imgUrl:"/assets/images/hero-4.svg" ,alt:"air fryer"},
    {imgUrl:"/assets/images/hero-5.svg" ,alt:"chair"},


]
export default function HeroCarousel(props) {
  return (
    <div className="w-[40%]">  
      <Carousel 
      autoPlay
      showThumbs={false}
      interval={2000}
      infiniteLoop 
      showArrows={false}>
        { 
        SampleImages.map((products,index)=>{ 

            return( 
                <Image src={products.imgUrl} alt={products.alt} width={1} height={1}/>
            )
           
          
        
         
        })}
      </Carousel>  
     
    </div>
  );
}
