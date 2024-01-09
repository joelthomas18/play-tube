import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';
import { getUserLoginStatus } from '$lib/server/utils/login-util.server.js';

export async function GET(event){
    let payload = {};
    let response = await getUserLoginStatus(event);

    if(response.userData.isAuthenticated){
        payload.user = response.userData._id
        let newResponse = await excecuteCRUD("getAllVideos",payload)
        console.log(newResponse,"new")
        return new Response(JSON.stringify(newResponse));

    
    }else{
        return new Response({status:"error",data:"User not logged in"})
    }

}