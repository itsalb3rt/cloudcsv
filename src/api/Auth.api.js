import httpClient from './HttpClient';

const END_POINT = '/auth/login';

const login = payload => httpClient.post(END_POINT, payload);

const register = payload => httpClient.post('auth/register',payload);

export {
    login,
    register
}