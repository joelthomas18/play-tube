
 


import {excecuteCRUD} from '$lib/server/database/db-crud-services.server.js';
import { getUserLoginStatus } from '$lib/server/utils/login-util.server';


export async function GET(event) {  
    
   
    let payload = {};
    let logResponse = await getUserLoginStatus(event);
    if(logResponse.userData.isAuthenticated){
        payload.user = await logResponse.userData._id
        let response = await excecuteCRUD("getAllItemCategory", payload);
    
        let menuList = {categories:[]}
         if(response.status=="success"){      
            let subCategoryMenu ;
            let itemCategoryMenu;
            let itemCategoryList = response.data;
            
            // loop for creating categories
            itemCategoryList.forEach((item)=>{
                if(menuList[item.category.code] == undefined){
                    menuList.categories.push(item.category.code);            
                    menuList[item.category.code] =  JSON.parse(JSON.stringify(item.category));
                    menuList[item.category.code].subCategories=[];
                    //console.log("HERE menu",  menuList)
                }
            })
    
            itemCategoryList.forEach((item)=>{
               
                if(menuList[item.category.code][item.subCategory.code] == undefined){               
                    menuList[item.category.code].subCategories.push(item.subCategory.code);
                    menuList[item.category.code][item.subCategory.code] = JSON.parse(JSON.stringify(item.subCategory));
                    menuList[item.category.code][item.subCategory.code].itemCategories=[];
                   // console.log("HERE menu -sub",  menuList[category.categoryId.code]['subCategories'], "done")
                }
            })
    
            itemCategoryList.forEach((item)=>{
               // console.log("HERE menu-item",  menuList)
                if(menuList[item.category.code][item.subCategory.code][item.code] == undefined){
                    menuList[item.category.code][item.subCategory.code].itemCategories.push(item.code);
                    menuList[item.category.code][item.subCategory.code][item.code] = item;               
                }
            })
    
         
    
            return new Response(JSON.stringify({status:"success", data:menuList}));
    
        }
        else{

            return new Response(JSON.stringify({status:"error",data:"no data"})) 
                }    
    }
   
 
    }


