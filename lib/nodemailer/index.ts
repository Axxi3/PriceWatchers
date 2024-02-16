import { EmailContent, EmailProductInfo, NotificationType } from "../../types/index";
import nodemailer from "nodemailer";

export const NOts = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
};

export const generateEmailBody = (
  product: EmailProductInfo,
  type: NotificationType
) => {
  const shortenTitle =
    product.title.length > 20
      ? product.title.slice(0, 20) + "..."
      : product.title;

  let subject = "";
  let body = "";
  switch (type) {
    case NOts.WELCOME:
      subject = "Hey there my guy!";
      body = `<div>
      <h2>Welcome to PriceWise 🚀</h2>
      <p>Currently we are tracking ${product.title}.</p>
      <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
          <h3>It looks like your product is back in stock!! chalo mauk bhai</h3>
          <p>Just go and buy it ASAP lesgoo- <a href="${product.callbackUrl}" target="_blank" rel="noopener noreferrer">CLICK HERE TO BUY</a>!</p>
      </div>
      <p>I will be providing you more info in future! bye</p>
  </div>
  `;
      break;

    case NOts.CHANGE_OF_STOCK:
      subject = "Price of " + shortenTitle + " has changed";
      body = ` <div>
            <h4>Hey, ${product.title} is now restocked! Grab yours before they run out again!</h4>
            <p>See the product <a href="${product.callbackUrl}" target="_blank" rel="noopener noreferrer">here</a>.</p>
          </div>`;
      break;

    case NOts.LOWEST_PRICE:
      subject = "Price of " + shortenTitle + " has dropped";
      body = `
            <div>
            <h4>Hey, ${product.title} has reached its lowest price ever!!</h4>
            <p>Grab the product <a href="${product.callbackUrl}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
          </div>
            `;
      break;
    

    default:
      throw new Error("Invalid notification type.");
  }
  return { subject, body };
};


const transpoter=nodemailer.createTransport({
  pool:true,
  service:"hotmail",
  port:2525,
  auth:{ 
    user:"literallyrajhu@outlook.com",
    pass:process.env.EMAIL_PASSWORD,
  }
})


export const sendEmail = async (emailContent:EmailContent,sendTo:string[])=>{ 
  const mailOprions={ 
    from: "literallyrajhu@outlook.com",
    to:sendTo,
    html: emailContent.body,
    subject:emailContent.subject
  }


  transpoter.sendMail(mailOprions,(error:any,info:any)=>{ 
    if(error){
      console.log("-------------------------------Send Mail Problem here----------------------------")
      console.log(error)
    }
    console.log("Email sent: " + info)
 // return the response to the caller, so that it can be used to track the email status. 
    // For example, you can use the response to track the email status and update the database accordingly. 
    // You can also use the response to send an email to the user with a link to the product page. 
    // This can help the user to track the status of their email and get the latest updates. 
    // You can also use the response to send an email to the user with a link to the product page. 
    // This can help the user to track the status of their email and get the latest updates. 
    // You can also use the response to send an email to the user with a link to the product page. 
    // This can help the user to track the status of their email and get the latest updates.
  })
}
