/**
 * The above code is a TypeScript module that includes functions for scraping and storing product data
 * from Amazon, retrieving individual products by ID, and retrieving a list of all products.
 * @param {string} ProductUrl - The `ProductUrl` parameter is a string that represents the URL of a
 * product on Amazon.
 * @returns The code is returning three functions: `scrapeAndStroreProduct`, `getProducts`, and
 * `getProductsList`.
 */
"use server"

import { revalidatePath } from "next/cache";
import { calculateAverage, getAveragePrice, getHighestPrice, getLowestPrice } from "../Utils";
import Product from "../models/ProductModel";
import { ScrapeAmazonProduct } from "../scraper";
import { connectToDb } from "../scraper/moongoose";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { sendResponse } from "next/dist/server/image-optimizer";


export async function scrapeAndStroreProduct(ProductUrl:string) {
    if(!ProductUrl) return;

    try {  
        connectToDb()
        const scrapedProduct=await ScrapeAmazonProduct  (ProductUrl)  
        console.log(scrapedProduct.currentPrice)
        if(!scrapedProduct) return;



        let product=scrapedProduct
        const existingProduct= await Product.findOne({url:scrapedProduct.url})

        if(existingProduct){ 
          console.log("PRoduct exists")
          let updatedPriceHistory = existingProduct.PriceHistory || []; // Get existing price history or initialize empty array
          updatedPriceHistory.push(Number(scrapedProduct.currentPrice));

          // const UpdtaedProduct:any=[
          //   ...existingProduct.priceHistory, //maybe needs to push but let's see
          //   {price:scrapedProduct.currentPrice} 
         
          // ]  
         console.log(updatedPriceHistory)


          product={
            ...scrapedProduct,
            PriceHistory:updatedPriceHistory ,
            lowestPrice:getLowestPrice(updatedPriceHistory),
            HighestPrice:getHighestPrice(updatedPriceHistory),
            averagePrice:calculateAverage(updatedPriceHistory)
        }
        
        }

        const newPRoduct=await Product.findOneAndUpdate(
             {url:scrapedProduct.url},
             product,
             
             {upsert:true,new:true})

     revalidatePath(`/product/${newPRoduct._id}`)

    } catch (error:any) {
        throw new Error(`Failed to create/update product :${error.message}`)
    }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {

      const product = await Product.findById(productId);
  
      if(!product) return;

      if (!product.users) {
        product.users = [];
    }

  
      const userExists = product.users.some((user: User) => user.email === userEmail);   

      let UpdatedUsers = product.users || []; 
      UpdatedUsers.push(String(userEmail));   
      console.log("---------From adduserEmail-------------") 
      console.log(product)

       



    
        const newData={ 
            ...product,
            users:UpdatedUsers,
        }  
        const newPRoduct=await Product.findOneAndUpdate(
            {url:product.url},
            newData,
            
            {upsert:true,new:true}) 
      
      const emailContent = await generateEmailBody(product, "WELCOME");
  
        await sendEmail(emailContent, [userEmail]);
    } catch (error) {
      console.log(error);
    }
  }



  export async function getProducts(productId:String) {
    try {
        connectToDb()
        const product= await Product.findOne({_id:productId})
    
    
        if(!product) return null; 
        return product
    } catch (error) {
        console.log(error)
    }
    }



    
    export async function getProductsList() {
        try {
            connectToDb()
            const products= await Product.find()
            if(!products) return null;
            return products;
        } catch (error) {
            console.log(error)
        }
    }  
    
