"use server"
import mongoose from "mongoose";

export const connectDB=async()=>{
    // console.log(process.env.DATABASE);
    try {
        await mongoose.connect(process.env.DATABASE || "");
        }
     catch (error) {
        console.log('database connection failed',error)
    }
    
}