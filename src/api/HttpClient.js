import axios from 'axios';

const httpClient = axios.create({
    baseURL: (process.env.NODE_ENV == 'development') ? process.env.VUE_APP_BASE_URL_DEV : process.env.VUE_APP_BASE_URL_PRO,
    timeout: 1000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;