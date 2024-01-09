import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"
import {getUserLoginStatus} from "$lib/server/utils/login-util.server.js";
export async function GET(event){
    var response = await getUserLoginStatus(event);
   
    if(response.userData.isAuthenticated){
        
        var payload = {category:event.url.searchParams.get("category")};
        // payload.user = response.userData._id;
        var response = await excecuteCRUD("getAllVideoByCategoryId",payload);
        return new Response(JSON.stringify(response));
    }else{
        return new Response("user not logged in");
    }
  
    
    
}



