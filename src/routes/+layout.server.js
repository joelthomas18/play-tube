import *as cookie from "cookie";
import jwt from "jsonwebtoken"
let secret = "454545";

export async function load(event){
 
    let cookies;


    if(event.request.headers.get("cookie")){

        cookies = cookie.parse(event.request.headers.get("cookie"));

        if(cookies.userToken !== null && cookies.userToken !== undefined){
            let decodedData = jwt.verify(cookies.userToken,secret);


            if(decodedData){

                let userData = {
                    userName:decodedData.userName,
                    email:decodedData.email,
                    _id:decodedData._id,
                    isAuthenticated:true
                };
                return {userData};
            }else{
                let userData = {
                    isAuthenticated:false
                };
    
                return {userData}
            }

            

        }else{
            let userData = {
                isAuthenticated:false
            };

            return {userData}

        }
           
    } else{
        let userData = {
            isAuthenticated:false
        };

        return {userData}
    }

        
       



        


  
    

}

