
export async function load({fetch}){

    let allVideos = [];
try {
    let response = await fetch("/api/getAllVideos",{method:"GET"});
    let jsonData = await response.json()
    allVideos = await jsonData.data;
} catch (error) {
    console.log(error)
}    

return {allVideos}
}