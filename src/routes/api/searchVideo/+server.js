import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"
import {getUserLoginStatus} from "$lib/server/utils/login-util.server.js";
export async function POST(event){
       let response = await getUserLoginStatus(event);
       if(response.userData.isAuthenticated){
       let payload = await event.request.json();
      
       let newResponse = await excecuteCRUD("searchVideo",payload);
    
       return new Response(JSON.stringify(newResponse));
       }else return new Response("you havent logged in yet");
}
