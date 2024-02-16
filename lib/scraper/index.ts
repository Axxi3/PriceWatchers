import axios from "axios";
import * as cheerio from "cheerio"
import { extractPrice, formatProductDetails } from "../Utils";
export async function  ScrapeAmazonProduct(url:string) {  

   


    if(!url) return; 

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_7aa00165-zone-unblocker:tnk09u5de8gg -k https://lumtest.com/myip.json
    const username=String(process.env.BRIGHT_DATA_USERNAME) 
    const password=String(process.env.BRIGHT_DATA_PASSWORD) 
    const port=22225
    const session_id=(1000000*Math.random()) | 0
    const options={ 
        auth:{ 
            username:`${username}-session-${session_id}`,
            password,
        },
        host:"brd.superproxy.io",
        port,
        rejectUnauthorized:false
    }



    try {
        const response= await axios.get(url,options )
        
            const $ = cheerio.load(response.data) 
            const title=  $('#productTitle').text().trim()  

            const originalPrice = extractPrice(
                $(".a-size-small.basisPrice span.a-price.a-text-price span.a-offscreen").text().replace(/[-%]/g, ""),
                null,null
            ) 

            const outOfStock=$('.a-declarative span.a-size-medium.a-color-success').text().trim()  
                const image=$('.a-dynamic-image-container img').attr('data-a-dynamic-image') ||
                        $("#imgTagWrapperId img").attr('data-a-dynamic-image') 

                        const ImageURl=Object.keys(JSON.parse(image))
            
            let currentPrice = extractPrice(
                $(".a-price.priceToPay.reinventPricePriceToPayMargin span.a-offscreen").text().trim(),
                $('.a-price.a-text-price.apexPriceToPay .a-offscreen').text().trim(),
                $('.a-price .a-offscreen').text().trim(),
               
              ); 


              if (currentPrice === undefined|| currentPrice === null) {
                currentPrice = extractPrice(
                    $(".a-price.a-text-price.apexPriceToPay .a-offscreen").text().trim(),
                    $(".slot-price span").text().trim(),null
                );
              } 

              const DiscountRate=$(".savingsPercentage").text().replace(/[-%]/g, "")  
              const AboutProduct=$(".a-list-item.a-size-base.a-color-base").text().trim() || $(".a-unordered-list.a-vertical.a-spacing-mini li.a-spacing-mini span").text().trim()

      

        const reviewers=$("#cm-cr-dp-review-list div.review div div div a.a-profile div.a-profile-content span.a-profile-name") 

        let formattedNames = [];


reviewers.each((index, element) => {
    // Extract the text content of the current element and trim any leading or trailing whitespace
    const name = $(element).text().trim();
    
    // Push the name into the formattedNames array
    formattedNames.push(name);
});  

const reviewTextDataRaw=$(".review-text div div span")

let formattedReviewTextData = [];


reviewTextDataRaw.each((index, element) => {
    
    const name = $(element).text().trim();
    if(name==="Read more" || name==="" || name=== "The media could not be loaded." ) { 
        return; // Skip the current element if it's "Read more" or empty or "The media could not be loaded."
    }
  
    formattedReviewTextData.push(name);  
});  
let crPRice

if(currentPrice ===null){ 
crPRice=Math.round( Number(originalPrice.replace(/[^\d.]/g, ''))) - ((Number(DiscountRate) / 100) * Number(originalPrice.replace(/[^\d.]/g, '')))
}


const data={ 
    url:ImageURl[0],
    callbackUrl:url,
    image:ImageURl,
    title:title,
    originalPrice: Number(originalPrice.replace(/[^\d.]/g, '')),
    currency:"IND",
    category:"N/A",
    lowestPrice: Number(currentPrice) || Number(originalPrice.replace(/[^\d.]/g, '')),
    HighestPrice: Number(originalPrice) || Number(originalPrice.replace(/[^\d.]/g, '')),
    averagePrice: Number(currentPrice) || Number(originalPrice.replace(/[^\d.]/g, '')),
    currentPrice: currentPrice !== null && currentPrice !== undefined ?Number(currentPrice.replace(/[^\d.]/g, ''))  :Math.round( Number(originalPrice.replace(/[^\d.]/g, ''))) - ((Number(DiscountRate) / 100) * Number(originalPrice.replace(/[^\d.]/g, ''))), // convert in frontend
    discountRate:Number(DiscountRate),
    description:AboutProduct || "No info available",
    reviewCount:formattedReviewTextData.length,
    isOutofStock:outOfStock==="" ? true:false,
    source:"amazon",
    userCount:formattedNames.length,
    reviewers:formattedNames,
    reviews:formattedReviewTextData,
  
    // priceHistory: []
    priceHistory:[
         currentPrice !== null && currentPrice !== undefined ?Number(currentPrice.replace(/[^\d.]/g, ''))  :Math.round( Number(originalPrice.replace(/[^\d.]/g, ''))) - ((Number(DiscountRate) / 100) * Number(originalPrice.replace(/[^\d.]/g, ''))), // convert in frontend
    ]
    ,
 
  

}  
console.log(data)

return data

   
          
    } catch (error:any) {
        throw new Error(`Failed to Scrape producr:${error.message}`)
    }
}  