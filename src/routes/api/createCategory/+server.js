import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';
import { getUserLoginStatus } from '$lib/server/utils/login-util.server.js';
export async function POST(event){
   let response = await getUserLoginStatus(event);
    if(response.userData.isAuthenticated){
        let payload = await event.request.json();
        payload.user = response.userData._id;
      
        let submission = await excecuteCRUD("createCategory",payload)
        if(submission.status === "error"){
            return new Response(JSON.stringify({
                status:"error",
                data:"Please fill all fields"
            }))
        }
        return new Response(JSON.stringify({
            status:"success",
            data:"Category created successfully"
        }))

    }else{
        return new Response(JSON.stringify({
            status:"success",
            data:"Category creation failed"
        }))
    }
    


}