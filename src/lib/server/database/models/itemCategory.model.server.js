import { excecuteMongoosQuery } from "$lib/server/utils/db-utils.server";
import mongoose from "mongoose";


var Schema = mongoose.Schema;
var itemCategorySchema = new Schema({
    itemCategoryName:{
        type:String,
        required:true,
        index:true,
       
    },
    itemCategoryDisplayName:{
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
    subCategoryName:{
        type:String
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subcategorycollection",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usercollection"
    },
   
    

})

itemCategorySchema.statics.createItemCategory = async function(payload){

  payload.code = Date.now();
  return excecuteMongoosQuery(this.create(payload));

}


itemCategorySchema.statics.onSubCategorySelection = async function(payload){

    return excecuteMongoosQuery(this.find({subCategory:payload.subCategory}));
  
  }
  


  itemCategorySchema.statics.getAllItemCategory = async function(payload){
    
   return excecuteMongoosQuery(this.find({user:payload.user}).populate("category subCategory").exec())
} 

itemCategorySchema.statics.getItemCategoryById = async function(payload){
    
    return excecuteMongoosQuery(this.findOne(payload));
} 


itemCategorySchema.statics.editItemCategory = async function(payload){
    
    return excecuteMongoosQuery(this.updateOne({_id:payload._id},{$set:payload}));    
    
} 

itemCategorySchema.statics.getItemCategoryByCategoryId = async function(payload){

    return excecuteMongoosQuery(this.find({subCategory:payload.subCategory}));

} 




export const ItemCategory = mongoose.model("itemcategorycollection",itemCategorySchema)