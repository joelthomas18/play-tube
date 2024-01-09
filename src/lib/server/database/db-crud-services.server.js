

 import connection from '$lib/server/database/mongo-connection.server.js';
import {User} from '$lib/server/database/models/user.model.server.js';
import { Category } from './models/category.model.server';
import { SubCategory } from './models/subCategory.model.server';
import { ItemCategory } from './models/itemCategory.model.server';
import { Video } from './models/video.model.server';

export async function excecuteCRUD(key, payload) {
   
    try {    
     
        switch (key) {                  
            
              case "handleRegister": var rows =  await User.handleRegister(payload)
            break;
            
            case "handleSignin": var rows =  await User.handleSignin(payload)
            break;

            
            case "createCategory": var rows =  await Category.createCategory(payload)
            break;

            case "getAllCategory": var rows =  await Category.getAllCategory(payload)
            break;

            case "createSubCategory": var rows =  await SubCategory.createSubCategory(payload)
            break;

            case "onCategorySelection": var rows = await SubCategory.onCategorySelection(payload)
            break;

            case "createItemCategory": var rows = await ItemCategory.createItemCategory(payload)
            break;

            case "onSubCategorySelection": var rows = await ItemCategory.onSubCategorySelection(payload)
            break;

            case "createVideo": var rows = await Video.createVideo(payload)
            break;

            case "getAllVideos": var rows = await Video.getAllVideos(payload)
            break;

            case "getAllItemCategory": var rows = await ItemCategory.getAllItemCategory(payload)
            break;
            
            case "getAllVideoByItemCategoryId": var rows = await Video.getAllVideoByItemCategoryId(payload)
            break; 

            case "getAllVideoByCategoryId": var rows = await Video.getAllVideoByCategoryId(payload)
            break;

            case "getAllVideoBySubCategoryId": var rows = await Video.getAllVideoBySubCategoryId(payload)
            break;

            case "getAllSearchTags": var rows = await Video.getAllSearchTags(payload)
            break;

            case "searchVideo": var rows = await Video.searchVideo(payload)
            break;

            case "getCategoryById": var rows = await Category.getCategoryById(payload)
            break;
  
            case "editCategory": var rows = await Category.editCategory(payload)
            break;

            case "getAllSubCategory": var rows = await SubCategory.getAllSubCategory(payload)
            break;

            case "getSubCategoryById": var rows = await SubCategory.getSubCategoryById(payload)
            break;

            case "editSubCategory": var rows = await SubCategory.editSubCategory(payload)
            break;

            case "getItemCategoryById": var rows = await ItemCategory.getItemCategoryById(payload)
            break;

            case "getSubCategoryByCategoryId": var rows = await SubCategory.getSubCategoryByCategoryId(payload)
            break;

            case "getVideoById": var rows = await Video.getVideoById(payload)
            break;

            case "getItemCategoryByCategoryId": var rows = await ItemCategory.getItemCategoryByCategoryId(payload)
            break;

            case "editVideo": var rows = await Video.editVideo(payload)
            break;
            
            case "deleteVideo": var rows = await Video.deleteVideo(payload)
            break;






          
            
            
            
            



            

           

        }
         if (rows) {
            return rows
        }
    }
    catch (err) {
      
        return {

            status: 'error', data: err

        }

    };
}
