import httpClient from './AxiosClient';

//get
const getCustomerById = (version, customerId) => httpClient.get(version + "/Customers/" + customerId)
const getAllCustomers = (version) => httpClient.get(version + "/Customers/All")

//post
const postNewCustomer = (version, payload) => httpClient.post(version + "/Customers", payload);

//put
const putCustomer = (version, payload) => httpClient.put(version + "/Customers/" + payload.id, payload )

export {
    getCustomerById,
    postNewCustomer,
    getAllCustomers,
    putCustomer
}