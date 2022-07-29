import httpClient from './AxiosClient';

//get
const getAllGuestByOccasionId = (version, occasionId) => httpClient.get(version + "/Occasions/" + occasionId + "/Guests",)

const postNewGuest = (version, payload) => httpClient.post(version + "/Guests", payload);

export {
    getAllGuestByOccasionId,
    postNewGuest
}