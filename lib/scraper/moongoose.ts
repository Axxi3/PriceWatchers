import mongoose from "mongoose";

let isConnected=false; 
export const connectToDb=async()=>{ 
    mongoose.set('strictQuery', true);

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI is not defined')
    }

    if(isConnected){
        return console.log('already connected')
    }    


    

    try {
        
        await mongoose.connect(process.env.MONGO_URI)

        isConnected= true
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}