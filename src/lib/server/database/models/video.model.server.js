import mongoose, { mongo } from "mongoose";
import {excecuteMongoosQuery} from "$lib/server/utils/db-utils.server";
var Schema = mongoose.Schema;
var videoSchema = new Schema({
    title:{
        type:String,
        required:true,        
        index:true,
       
    },
    description:{
        type:String,
        index:true,
    },
    videoUrl:{
        type:String,
        index:true,
        required:true
        
    },
    videoType:{
        type:String
    },
   
    code:{
        type:String,
        unique:true,
        index:true
    },
    
    searchTags:{
        type:[String],
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
    itemCategoryName:{
        type:String
    },
    itemCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"itemcategorycollection",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usercollection"
    },
   


})

videoSchema.index({title:"text",description:"text",tags:"text",searchTags:"text"})

videoSchema.statics.createVideo = async function(payload){

    payload.code = Date.now();
    return excecuteMongoosQuery(this.create(payload))

}



videoSchema.statics.getAllVideos = async function(payload){
    
    return excecuteMongoosQuery(this.find({user:payload.user}));
} 
videoSchema.statics.getAllVideoByItemCategoryId = async function(payload){
    return excecuteMongoosQuery(this.find({itemCategory:payload.itemCategory}));
} 


videoSchema.statics.getAllVideoByCategoryId = async function(payload){
    return excecuteMongoosQuery(this.find({category:payload.category}));
} 


videoSchema.statics.getAllVideoBySubCategoryId = async function(payload){
    return excecuteMongoosQuery(this.find({subCategory:payload.subCategory}));
} 


videoSchema.statics.getAllSearchTags = async function(payload){
    return excecuteMongoosQuery(this.find({user:payload.user}).select("title searchTags description"));
} 
videoSchema.statics.searchVideo = async function(payload){
   
    return excecuteMongoosQuery(this.find({$text:{

        $search:payload.searchTerm

    }}));
    
}

videoSchema.statics.getVideoById = async function(payload){
    return excecuteMongoosQuery(this.findOne({_id:payload._id}));
} 

videoSchema.statics.editVideo = async function(payload){
    
    return excecuteMongoosQuery(this.updateOne({_id:payload._id},{$set:payload}));
} 

videoSchema.statics.deleteVideo = async function(payload){

    return excecuteMongoosQuery(this.deleteOne({_id:payload._id}))
}



export const Video = mongoose.model("videocollection",videoSchema)