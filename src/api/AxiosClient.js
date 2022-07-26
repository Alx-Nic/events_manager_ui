import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: process.env.VUE_APP_APIBASE,
    withCredentials: true
})

export default AxiosClient;