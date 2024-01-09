import { ajaxError, ajaxSuccess } from "$lib/store/app.store";

export async function getJSONDATA (url, params, serverFecth, status=null) {
	
    var queryString = new URLSearchParams(params).toString();
	
    var urlWithParams = url+"?"+queryString;    
    try {
        if(serverFecth!==null && serverFecth!== undefined){  
			   
            let response = await serverFecth(urlWithParams)
            var jsonData = await response.json();
			//console.log(jsonData);
            return jsonData;
                }
        else{      
            let response = await fetch(urlWithParams);
            var jsonData = await response.json();
            return jsonData;
        }
       

    }
    catch(error){
        return {status:'error', data:error}

    }
};


export async function postJSONDATA(url, body, status=null) {
	let data = JSON.stringify(body);

	try{
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
        var jsonData = await response.json();
		
		if(status!==null){
			if(jsonData.status == "error"){
				ajaxError.update((state)=>{
					state.isError = true;
					state.message = jsonData.data;
					return state;
				});
			}
			if(jsonData.status == "success"){
				ajaxSuccess.update((state)=>{
					state.isSuccess = true;
					state.message = jsonData.data;
					return state;
				});
	
			}
		}
		
		
        return jsonData;
	} 
	catch(error){
        return {status:'error', data:error}
    };
}  



export async function deleteJSONDATA(url, body, status=null) {
	try{
		let response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
        var jsonData = await response.json();
		if(status!==null){
			if(jsonData.status == "error"){
				ajaxError.update((state)=>{
					state.isError = true;
					state.message = "An Error Occured !! please check the input values submitted .. or try after some time";
					return state;
				});
			}
			if(jsonData.status == "success"){
				ajaxSuccess.update((state)=>{
					state.isSuccess = true;
					state.message = "Succesfull Operation !!";
					return state;
				});
	
			}
		}
        return jsonData;
	} 
	catch(error){
        return {status:'error', data:error}
    };
}  


export async function patchJSONDATA(url, body, status=null) {
	try{
		let response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
        var jsonData = await response.json();
		if(status!==null){
		if(jsonData.status == "error"){
			ajaxError.update((state)=>{
				state.isError = true;
				state.message = "An Error Occured !! please check the input values submitted .. or try after some time";
				return state;
			});
		}
		if(jsonData.status == "success"){
			ajaxSuccess.update((state)=>{
				state.isSuccess = true;
				state.message = "Succesfull Operation !!";
				return state;
			});

		}
	}
        return jsonData;
	} 
	catch(error){
        return {status:'error', data:error}
    };
}  