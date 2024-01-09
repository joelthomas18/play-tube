

export async function GET(event){

    let signOutResponse = new Response(JSON.stringify({status:"success",data:"Signed out successfully"}))
    signOutResponse.headers.set("set-cookie",`userToken=deleted;path=/;expires=Thu, 01 Jan 1997 00:00:00 GMT`);
    return signOutResponse;
}