import { excecuteMongoosQuery } from "$lib/server/utils/db-utils.server";
import mongoose from "mongoose";



var Schema = mongoose.Schema;
var categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true,
        index:true,
       
    },
    categoryDisplayName:{
        type:String,
        required:true,
        index:true,
    },
    image:{
        type:String,        
    },
    code:{
        type:String,
        unique:true,
        index:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usercollection"
    },
    order:{
        type:Number,
    }

})



categorySchema.statics.createCategory = async function(payload){

    payload.code = Date.now();
    return excecuteMongoosQuery(this.create(payload));
}

categorySchema.statics.getAllCategory = async function(payload){
    return excecuteMongoosQuery(this.find({user:payload.user}));

}

categorySchema.statics.getCategoryById = async function(payload){

    return excecuteMongoosQuery(this.findOne({_id:payload._id}));
} 

categorySchema.statics.editCategory = async function(payload){
    return excecuteMongoosQuery(this.updateOne({_id:payload._id},{$set:{
        categoryName:payload.categoryName,
        categoryDisplayName:payload.categoryDisplayName
    }}));
} 



export const Category = mongoose.model("categorycollection",categorySchema)  