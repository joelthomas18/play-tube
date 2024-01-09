import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"
import {getUserLoginStatus} from "$lib/server/utils/login-util.server.js";
export async function GET(event){
    let response = await getUserLoginStatus(event);
   
    if(response.userData.isAuthenticated){
        
        let payload = {category:event.url.searchParams.get("category")};
        console.log(payload,"server")
        let newResponse = await excecuteCRUD("getSubCategoryByCategoryId",payload);
        return new Response(JSON.stringify(newResponse));
    }else{
        return new Response("user not logged in");
    }
  
    
    
}
