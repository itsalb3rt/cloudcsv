import httpClient from './HttpClient';

const END_POINT = '/systememail/systememail';

const getEmail = () => httpClient.get(END_POINT);

const save = payload => httpClient.post(END_POINT,payload);

export {
    getEmail,
    save
}