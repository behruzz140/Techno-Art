import axios from "axios";
import { getCookies } from "@coocse";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})




request.interceptors.request.use((config) => {
    const access_token = getCookies("token") 
    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config
})

export default request


