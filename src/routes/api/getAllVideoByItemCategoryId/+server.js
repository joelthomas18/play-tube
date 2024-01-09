import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"
import {getUserLoginStatus} from "$lib/server/utils/login-util.server.js";
export async function GET(event){
    var response = await getUserLoginStatus(event);
   
    if(response.userData.isAuthenticated){
        
        var payload = {itemCategory:event.url.searchParams.get("itemCategory")};
        // payload.user = response.userData._id;
        var response = await excecuteCRUD("getAllVideoByItemCategoryId",payload);
        return new Response(JSON.stringify(response));
    }else{
        return new Response("user not logged in");
    }
  
    
    
}



