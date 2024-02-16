import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    url:{type:String,required:true,unique:true},
    image: [{
        type: String,
        required: true
      }],
    callbackUrl:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    currency:{type:String,default:"₹"},
    originalPrice:{type:Number,required:true},
    priceHistory: [{type:Number,default:[]}],
    lowestPrice:{type:Number},
    HighestPrice:{type:Number},
    averagePrice:{type:Number},
    currentPrice:{type:Number},
    discountRate:{type:Number},
    description:{type:String},
    reviewCount:{type:Number},
    isOutofStock:{type:Boolean},
    userCount:{type:Number},
    reviews:[{type:String}],
    reviewers:[{type:String}],
    source:{type:String},
    users: [
      {email: { type: String, required: true}}
    ], default: [],

},{timestamps:true})


const Product=mongoose.models.Product || mongoose.model("Product",productSchema)

export default Product