import { NotificationType, PriceHistoryItem, Product } from "@/types";
import { NOts } from "./nodemailer";

export function extractPrice(priceToPay, array: any, original) {
  console.log("This is price To Pay");
  console.log(priceToPay);
  console.log("This is price To Pay");
  console.log(array);
  if (priceToPay !== "") {
    return priceToPay;
  } else if (array !== null) {
    const priceArray = convertStringToArray(array);
    return priceArray[0];
  } else if (original !== null) {
    const priceArray = convertStringToArray(array);
    return priceArray[0];
  } else {
    console.log("Not found");
    return ""; // or any other value you want to return when not found
  }
}

export function getLowestPrice(priceList: number[]) {
  let lowestPrice = priceList[0];

  for (let i = 1; i < priceList.length; i++) {
    if (priceList[i] < lowestPrice) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice;
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}  

export function calculateAverage(arr) {
  const sum = arr.reduce((total, current) => total + current, 0);
  const average = sum / arr.length;
  return average;
}

function convertStringToArray(priceString) {
  // Split the string by the currency symbol "₹"
  const priceArray = priceString.split("₹");

  // Remove empty elements and trim any leading/trailing whitespace
  const filteredArray = priceArray.filter((price) => price.trim() !== "");

  return filteredArray;
}

export function formatProductDetails(input) {
  const lines = input
    .split("\n")
    .map((line) => line.trim()) // Remove leading and trailing whitespace
    .filter((line) => line !== ""); // Remove empty lines

  const formattedLines = lines.map((line) => {
    const parts = line.split("‎:‎"); // Split each line into key-value pair
    const key = parts[0].trim(); // Extract key
    const value = parts[1] ? parts[1].trim() : ""; // Extract value, handle case where value is missing
    return `${key} : ${value}`; // Format key-value pair with proper spacing
  });

  return formattedLines.join("\n"); // Join formatted lines into a single string
}


export const getEmailNotifType = (scrapeProducts: Product, Currentproduct: Product)=> {
  const prices = Currentproduct.priceHistory.map(item => item.price); 
  const lowestPrice = getLowestPrice(prices); 

  if (scrapeProducts.currentPrice < lowestPrice) {
    return NOts.LOWEST_PRICE as keyof typeof NOts;
  } 

  if (!scrapeProducts.isOutofStock && Currentproduct.isOutofStock) {
    return NOts.CHANGE_OF_STOCK as keyof typeof NOts;
  }

  // Add more conditions as needed

  // If no matching condition found, return null
  return null;
};
