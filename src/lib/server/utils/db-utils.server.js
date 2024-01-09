
export async function excecuteMongoosQuery(query){ 
  

    try{
        let response = await query;   
        console.log(response,"response")
        return {status:"success",data:response};   }
    catch(error){
        console.log("ERROR INSIDE AGGREGATE",error);      
        return {status:"error", data:error}
  
    }
  
  }

