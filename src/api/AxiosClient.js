import axios from 'axios';
import store from '@/store/index'
import i18n from '@/i18n.js' 


const AxiosClient = axios.create({
    baseURL: process.env.VUE_APP_APIBASE,
    withCredentials: true
})

AxiosClient.interceptors.request.use(config=> requestConfig(config));

const requestConfig = (config) => {
    store.commit('clearBackendError');
    return config
}

AxiosClient.interceptors.response.use(response => successHandler(response), 
                                      error => errorHandler(error));

const successHandler = (response) => response;

const errorHandler = (error) => {
    let knownErrors = i18n.t('errors');

    let err = {
        statusCode: error.response.status,
        errorMessage: knownErrors.generic+(error.response.status)
    }    

    if(Object.prototype.hasOwnProperty.call(knownErrors, error.response.status))
    {
        err.errorMessage = i18n.t('errors.'+error.response.status)
    }

    store.commit('updateBackendError', err);
    
    return Promise.reject(error);
}



export default AxiosClient;