import { excecuteCRUD } from '$lib/server/database/db-crud-services.server.js';

export async function POST(event){
    let responseString;
    let token;
    let payload = await event.request.json();
    let response = await excecuteCRUD("handleSignin",payload);
    
    if(response.status === "success"){
         token = response.data.token;
        responseString = {status:"success",data:"User signed in successfully"}
    }else{

        responseString = {status:"error",data:"Invalid email or password"}

    }

  let signInResponse = new Response(JSON.stringify(responseString))

    if(responseString.status === "success"){
        signInResponse.headers.set("set-cookie",`userToken = ${token};path = /;Max-Age = ${7*24*60*60}`)
    }
    
    return signInResponse;
}