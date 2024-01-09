import { getUserLoginStatus } from '$lib/server/utils/login-util.server.js';
import {excecuteCRUD} from "$lib/server/database/db-crud-services.server.js"

export async function GET(event){
    let response = await getUserLoginStatus(event);
    if(response.userData.isAuthenticated){
        let autoSearchArray = [];
        let payload = {}
        payload.user = response.userData._id;
        let newResponse = await excecuteCRUD("getAllSearchTags",payload);
        newResponse.data.forEach((item) => {

            autoSearchArray = [...autoSearchArray,item.title,item.description,...item.searchTags]

        })
        let responseObject = {status:"success",data:autoSearchArray}
        return new Response(JSON.stringify(responseObject));
    }else{
        return new Response(JSON.stringify({status:"error",data:"user not logged in"}))
    }
   
    

}