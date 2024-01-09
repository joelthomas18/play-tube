import *as cookie from "cookie";
import {redirect} from "@sveltejs/kit";


export async function handle({event,resolve}){

    
    let cookies;
    if(event.request.headers.get("cookie"))
    {
        cookies = cookie.parse(event.request.headers.get("cookie"));

        if(event.url.pathname === '/' && cookies.userToken){
           throw redirect(307,"/play-tube/home")
        }
    }

    let response = await resolve(event);
    

    return response;



}




