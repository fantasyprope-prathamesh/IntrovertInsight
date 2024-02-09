import axios from "axios";

export const makeRequestt = axios.create({
    baseURL : "http://localhost:8005/api/",
    withCredentials : true
})