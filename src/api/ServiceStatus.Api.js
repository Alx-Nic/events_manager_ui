import httpClient from './AxiosClient';

//get
const getAPIServiceStatus = () => httpClient.get("/ServiceStatus");

export {
    getAPIServiceStatus
}