import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';
import { getUserLoginStatus } from '$lib/server/utils/login-util.server.js';

export async function GET(event){
    let response = await getUserLoginStatus(event);
    console.log(response,"response");

    if(response.userData.isAuthenticated){
        let payload = {};
        payload.user = response.userData._id;
      let newResponse = await excecuteCRUD("getAllCategory",payload);
        return new Response(JSON.stringify(newResponse));
    }else{
        return new Response({status:"error",data:"User not logged in"})
    }
   

}