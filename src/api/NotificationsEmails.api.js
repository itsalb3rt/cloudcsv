import httpClient from './HttpClient';

const END_POINT = '/notificationsemails/notificationsemails';

const getNotificationsEmails = () => httpClient.get(END_POINT);

const getEmail = (tableId) => httpClient.get(END_POINT, tableId);

const createNotification = payload => httpClient.post(END_POINT,payload);

const deleteNotification = notificationId => httpClient.delete(`${END_POINT}/${notificationId}`);

export {
    getNotificationsEmails,
    getEmail,
    createNotification,
    deleteNotification
}