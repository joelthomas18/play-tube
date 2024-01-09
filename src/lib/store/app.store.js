import { writable } from 'svelte/store';

export const ajaxError = writable({
    isError:false,
    message:"An error happened"
    })
export const ajaxSuccess = writable({
        isSuccess:false,
        message:"It was successfull"
        })