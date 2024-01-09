
import *as cookie from "cookie";
import jwt from "jsonwebtoken";
let secret = "454545";


export async function getUserLoginStatus(event){

    let cookies;

    if(event.request.headers.get("cookie")){
     
        cookies = cookie.parse(event.request.headers.get("cookie"));
      
        
        if(cookies.userToken !== null && cookies.userToken !== undefined){

            let decoded = jwt.verify(cookies.userToken,secret);
            if(decoded){
                let userData = {
                    userName:decoded.userName,
                    email:decoded.email,
                    _id:decoded._id,
                    
                    isAuthenticated:true
                };
                
                
                return {userData:userData};
                
            }else{
                let userData = {
                    isAuthenticated:false
                };
                
                
                return {userData:userData};
                
            }

                }else{
                    let userData = {
                        isAuthenticated:false
                    };
                   
                
                return {userData:userData};
                   
                }
            }else{
                let userData = {
                    isAuthenticated:false
                };
             
                
                return {userData:userData};
                
            }

            

}