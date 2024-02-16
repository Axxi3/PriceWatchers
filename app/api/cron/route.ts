import { calculateAverage, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/Utils"
import Product from "../../../lib/models/ProductModel"
import { generateEmailBody, sendEmail } from "../../../lib/nodemailer"
import { ScrapeAmazonProduct } from "../../../lib/scraper"
import { connectToDb } from "../../../lib/scraper/moongoose"
import { NextRequest, NextResponse } from "next/server"

export async function GET(){ 
    try {
        connectToDb()
        const products=await Product.find({}) 

        if(!products) return new Response("No products found", {status: 404})

        const updatedPRoduct= await Promise.all(
            products.map(async (Currentproduct)=>{
                /* This code block is updating the product information in the database. */
                const scrapeProducts=await ScrapeAmazonProduct(Currentproduct.callbackUrl)
                if(!scrapeProducts) return new Response("No products found", {status: 404})
                let updatedPriceHistory = Currentproduct.PriceHistory || []; // Get existing price history or initialize empty array
          updatedPriceHistory.push(Number(scrapeProducts.currentPrice))


        const product={
            ...scrapeProducts,
            PriceHistory:updatedPriceHistory ,
            lowestPrice:getLowestPrice(updatedPriceHistory),
            HighestPrice:getHighestPrice(updatedPriceHistory),
            averagePrice:calculateAverage(updatedPriceHistory)
        }

        const UpdatedProduct=await Product.findOneAndUpdate(
            {url:scrapeProducts.url},
            product,
            )

                //checking PRoduct and updating
            
            const emailNotsType=getEmailNotifType(scrapeProducts,Currentproduct)
                if(emailNotsType && UpdatedProduct.users.length>0){ 
                    const ProductInfo={ 
                        title:UpdatedProduct.title,
                        callbackUrl:UpdatedProduct.callbackUrl
                    }



                    const emailContent=await generateEmailBody(ProductInfo,emailNotsType)

                    const userEmail=UpdatedProduct.users.map((user:any)=>user.email)

                    await sendEmail(emailContent,userEmail) 


                    
                } 

            
return updatedPRoduct

            })
        )

        return NextResponse.json({
            message:"Ok",data:updatedPRoduct
        })
    } catch (error) {
        throw new Error(`Error in GET : ${error}`)
        
    }
}