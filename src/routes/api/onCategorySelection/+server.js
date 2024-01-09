import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';
import { getUserLoginStatus } from '$lib/server/utils/login-util.server.js';

export async function GET(event){

    let response = await getUserLoginStatus(event);
    if(response.userData.isAuthenticated){

        let payload = {category:event.url.searchParams.get("category")};

        let newResponse = await excecuteCRUD("onCategorySelection",payload);

        return new Response(JSON.stringify(newResponse));

       
    }else{
        return new Response(JSON.stringify({
            status:"success",
            data:"User not logged in"
        }))
    }

}