
import Modal from '@/Components/Modal';
import { Notification } from '@/Components/Notification';
import ReviewCard from '@/Components/ReviewCard';
import { getHighestPrice } from '@/lib/Utils';
import { getProducts } from '@/lib/actions';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import Link from 'next/link';
import React  from 'react';

export default async function ProductPage({ params }) {
  const { id } = params;
  const product=await getProducts(id)



console.log(product)

  return (
    <div className="product-container absolute">  
    <div className=" sticky top-0">
      <Notification/>
    </div>
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image src={product.url} alt="Laptop" width={500} height={500} className='mx-auto' />
        </div>

        <div className="flex-1 flex-col flex">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
          <div className="flex flex-col gap-3">  
          <h1 className="text-[28px] text-secondary font-bold">{product.title}</h1>
          <Link href={product.callbackUrl || ""} className='text-base text-black opacity-50'>View Amazon Page</Link>

          </div>
          <div className="flex items-center gap-3">
            <div className="product-Heart  bg-white-200 rounded-[20px] p-3">
              <Image src={"/assets/icons/red-heart.svg"} alt='heart' 
              width={30} height={30}></Image>
             
            </div> 
            <div className="product-share bg-white-200 rounded-[20px] p-3">
              <Image src={"/assets/icons/share.svg"} alt='share'
              width={30} height={30}></Image>
              </div>  

              
          </div>


          <div className="productInfo">
            <div className="flex flex-col gap-2">
              <p className='text-[34px] text-secondary font-bold pr-6'>{product.currency} {Math.floor(product.currentPrice)}</p>
            </div>

         
          </div>  

          </div>
          
          <div className="PriceHistory flex flex-col gap-5">  
          <div className="Top flex items-center justify-between">
          <div className="AveragePrice w-[40%] bg-white-200 rounded-[20px] p-4 flex flex-col items-center ">
              <p className='text-[20px] text-secondary font-bold'>Average Price</p>
              <div className="prices flex items-center justify-between gap-2"> 
                <Image src={"/assets/icons/chart.svg"} width={25} height={25}/>  
                <p className='text-[20px] text-primary font-bold'>{product.currency} {Math.floor(product.averagePrice)}</p>
              </div>
            
            </div> 
            <div className="CurrentPrice  w-[40%] bg-white-200 rounded-[20px] p-4 flex flex-col items-center ">
              <p className='text-[20px] text-secondary font-bold'>Current Price</p>  
              <div className="prices flex items-center justify-between gap-2"> 
                <Image src={"/assets/icons/price-tag.svg"} width={25} height={25}/> 
                 <p className='text-[20px] text-primary font-bold'>{product.currency} {Math.floor(product.currentPrice)}</p>
              </div>


            </div>
          </div>  
          <div className="Top flex items-center justify-between">
          <div className="AveragePrice w-[40%] bg-white-200 rounded-[20px] p-4 flex flex-col items-center ">
              <p className='text-[20px] text-secondary font-bold'>Highest Price</p>  

              <div className="prices flex items-center justify-between gap-2"> 
                <Image src={"/assets/icons/arrow-up.svg"} width={25} height={25}/> 
                <p className='text-[20px] text-primary font-bold'>{product.currency} {Math.floor(product.HighestPrice)}</p>
              </div>
              
            </div> 
            <div className="CurrentPrice  w-[40%] bg-white-200 rounded-[20px] p-4 flex flex-col items-center ">
              <p className='text-[20px] text-secondary font-bold'>Lowest Price</p>  
              <div className="prices flex items-center justify-between gap-2"> 
                <Image src={"/assets/icons/arrow-down.svg"} width={25} height={25}/> 
                <p className='text-[20px] text-primary font-bold'>{product.currency} {Math.floor(product.lowestPrice)}</p>
              </div>
       
            </div>

          </div>
       
            
          </div>


        <Modal id={id}/>




        </div>
      </div>  


      <div className="Description">
          <h1 className="text-[28px] text-secondary font-semibold">Product Description</h1>  
          <p>{product.description}</p>
          </div>

          <div className="Reviews">
            <h1 className="text-[28px] text-secondary font-semibold">Product Reviews</h1>
            <div className="flex  gap-5 flex-col md:flex-row  p-8 items-center justify-evenly w-[100%]">
            {product.reviews.slice(0, 3).map((review, index) => (
        <ReviewCard key={index} review={review} reviewers={product.reviewers[index]} />
    ))}
            </div>  
   

          </div>
    </div>
  );
}
