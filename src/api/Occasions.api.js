import httpClient from './AxiosClient';

// get
const getAllOccasionsForUser = (version, userId) => httpClient.get(version + "/AccessUsers/" + userId + "/Occasions")


// post
const postOccasion = (version, payload) => httpClient.post(version + '/Occasions', payload);

export {
    getAllOccasionsForUser,
    postOccasion
}
