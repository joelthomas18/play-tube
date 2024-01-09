
import *as cookie from "cookie";
import {redirect} from "@sveltejs/kit";

export async function load({request}){
  let cookies;
  if(request.headers.get("cookie"))
  {
      cookies = cookie.parse(request.headers.get("cookie"));
      if(cookies.userToken){
         throw redirect(307,"/play-tube/home")
      }
    
    
    }





    

}

