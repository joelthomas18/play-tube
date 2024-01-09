import { excecuteMongoosQuery } from "$lib/server/utils/db-utils.server";
import mongoose from "mongoose";



var Schema = mongoose.Schema;
var subCategorySchema = new Schema({
    subCategoryName:{
        type:String,
        required:true,
        index:true,
       
    },
    subCategoryDisplayName:{
        type:String,
        required:true,
        index:true,
    },
   
    code:{
        type:String,
        unique:true,
        index:true
    },
    categoryName:{
        type:String,

    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categorycollection",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usercollection"
    },
    
})

subCategorySchema.statics.createSubCategory = async function(payload){

   payload.code = Date.now();
   return excecuteMongoosQuery(this.create(payload));
    

}

subCategorySchema.statics.onCategorySelection = async function(payload){

    return excecuteMongoosQuery(this.find({category:payload.category}));
     

}
subCategorySchema.statics.getAllSubCategory = async function(payload){
    
    return excecuteMongoosQuery(this.find({}).populate("category").exec());    
    
} 
subCategorySchema.statics.getSubCategoryById = async function(payload){
    return excecuteMongoosQuery(this.findOne({_id:payload._id}));    
    
} 
subCategorySchema.statics.editSubCategory = async function(payload){
    return excecuteMongoosQuery(this.updateOne({_id:payload._id},{$set:payload}));    
    
} 

subCategorySchema.statics.getSubCategoryByCategoryId = async function(payload){
    console.log(payload,"mongo")
    return excecuteMongoosQuery(this.find({category:payload.category}));    
    
} 


export const SubCategory = mongoose.model("subcategorycollection",subCategorySchema)