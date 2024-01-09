

import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';

export async function POST(event){

    let payload = await event.request.json();
    let submission = await excecuteCRUD("handleRegister",payload)
    if(submission.status === "success"){
        return new Response(JSON.stringify({
            status:"success",
            data:"User registered successfully"
        }))
    }else{
        return new Response(JSON.stringify({
            status:"error",
            data:"User name or email already exists.Try using different one."
        }))
    }
   
        



}

