
import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    photo?: string;
    supaId:string;
    number?:string;
    unique:string|boolean
  }

const userSchema = new mongoose.Schema<IUser>({
    supaId:{
     type:String,
     unique:true
    },
    name :{
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        
    },
    photo: {
        type: String,
        
    },
    number:{
        type:String
    }
}, {
    versionKey: false
})




const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;