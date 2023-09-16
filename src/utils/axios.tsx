import axios from 'axios';
import { configGlobals } from './config';
import { ToastContainer, toast } from 'react-toastify';

const Axios = axios.create({
    baseURL: configGlobals.url,
    timeout: 100000
})

// window.onunload = function () {
// 	localStorage.clear();
// }

Axios.interceptors.request.use(
    function (config: any) {
        if(localStorage.getItem('token')){
            if(!config.headers){
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${localStorage?.getItem('token')}`
        }
        return config
    }
)

const AxiosServer = axios.create();
AxiosServer.interceptors.request.use(function(config: any) {
    config.headers.Authorization = import.meta.env.VITE_API_KEY;
    return config;
})

AxiosServer.interceptors.request.use(request => {
    request.maxContentLength = Infinity;
    request.maxBodyLength = Infinity;
    return request;
})


export { Axios, AxiosServer }