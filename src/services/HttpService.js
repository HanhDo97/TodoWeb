import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

function sendPostRequest(url, data) {
    const token = localStorage.getItem('token');

    return httpClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
function sendPutRequest(url, data) {
    const token = localStorage.getItem('token');

    return httpClient.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
function sendGetRequest(url) {
    const token = localStorage.getItem('token');

    return httpClient.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export default {
    sendPostRequest, sendPutRequest, sendGetRequest
}