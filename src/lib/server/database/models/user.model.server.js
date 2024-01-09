import mongoose from "mongoose";
 import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";
import { excecuteMongoosQuery } from "$lib/server/utils/db-utils.server";

let token;
let secret = "454545";
let responseString;

let Schema = mongoose.Schema;
let userSchema = new Schema({


    userName:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        
    },

    password:{
        type:String,
        required:true,
        unique:true
    },

    created:{
        type:Date,
        default:Date.now
    }





});

userSchema.statics.handleRegister = async function(payload){
   
    let newUser = payload;
    newUser.password = bcrypt.hashSync(payload.password,10);
    return excecuteMongoosQuery(this.create(newUser));
    
}

userSchema.statics.handleSignin = async function(payload){


    let user = await this.findOne({email:payload.email});
    let isCorrectUser = bcrypt.compareSync(payload.password,user.password)
    if(isCorrectUser === false){
        return {status:"error",data:"authentification failed,invalid username or password"}
    }
    if(isCorrectUser){
        token = jwt.sign({
            userName:user.userName,
            email:user.email,
            _id:user._id
        

        },secret,{
            expiresIn:"7d"
        });

        responseString = {status:"success",data:{token}}
        
    }else{
        responseString = {status:"error",data:"Technical error"}
    }

    return (responseString)

}





export const User = mongoose.model("usercollection",userSchema);





