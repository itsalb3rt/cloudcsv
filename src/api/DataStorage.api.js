import httpClient from './HttpClient';

const END_POINT = '/datastorage/datastorage';


/**
 * The payload is a object like
 * payload:{
 * tableId:1,
 * queryString: '?create_at>=2019-10-01&create_at<=2019-10-30&...'
 * }
 */
const getDataByTable = payload => {
    const pagination = `offset=${payload.page}&limit=${payload.itemsPerPage}`;
    const newQueryString = payload.queryString ? `${payload.queryString}&${pagination}` : `?${pagination}`;

    return httpClient.get(`${END_POINT}/${payload.tableId}${newQueryString}`, payload)
};

const save = payload => httpClient.post(END_POINT, payload);

const deleteByTable = payload => httpClient.delete(`${END_POINT}/${payload.idTable}/${payload.idRecord}`);

export {
    getDataByTable,
    save,
    deleteByTable
}