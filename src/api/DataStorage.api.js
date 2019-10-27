import httpClient from './HttpClient';

const END_POINT = '/datastorage/datastorage';

const getDataByTable = id => httpClient.get(END_POINT, id);

const save = payload => httpClient.post(END_POINT, payload);

const deleteByTable = payload => httpClient.delete(`${END_POINT}/${payload.idTable}/${payload.idRecord}`);

export {
    getDataByTable,
    save,
    deleteByTable
}