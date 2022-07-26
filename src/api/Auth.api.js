import httpClient from './AxiosClient';

const authenticate = (version, authRequest) => httpClient.post(version + "/Authenticate", authRequest, {withCredentials: true})

export {
    authenticate
}