import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"
import {getUserLoginStatus} from "$lib/server/utils/login-util.server.js";
export async function GET(event){
    var response = await getUserLoginStatus(event);
   
    if(response.userData.isAuthenticated){
        
        var payload = {subCategory:event.url.searchParams.get("subCategory")};
        // payload.user = response.userData._id;
        var response = await excecuteCRUD("getAllVideoBySubCategoryId",payload);
        return new Response(JSON.stringify(response));
    }else{
        return new Response("user not logged in");
    }
  
    
    
}
