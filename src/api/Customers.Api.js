import httpClient from './AxiosClient';

//get
const getCustomerById = (version, customerId) => httpClient.get(version + "/Customers/" + customerId)

const postNewCustomer = (version, payload) => httpClient.post(version + "/Customers", payload);

export {
    getCustomerById,
    postNewCustomer
}