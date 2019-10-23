import axios from 'axios';

const httpClient = axios.create({
    baseURL: (process.env.NODE_ENV == 'development') ? process.env.VUE_APP_BASE_URL_DEV : process.env.VUE_APP_BASE_URL_PRO,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;