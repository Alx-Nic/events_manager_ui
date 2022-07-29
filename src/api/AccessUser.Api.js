import httpClient from './AxiosClient';

//get
const getAccessUserByClientId = (version, clientId) => httpClient.get(version + "/Customers/" + clientId + "/AccessUsers",);
const getAccessUser = (version, accessUserId) => httpClient.get(version + "/AccessUsers/" + accessUserId);

const postAccessUser = (version, payload) => httpClient.post(version + "/Register", payload);

export {
    getAccessUserByClientId,
    getAccessUser,
    postAccessUser
}