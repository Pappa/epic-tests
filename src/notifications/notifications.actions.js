export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export const SOCKET_ERROR = 'SOCKET_ERROR';

export const loginSuccessAction = () => ({
    type: LOGIN_SUCCESS
});

export const onSocketMessageAction = (msg) => ({
    type: SOCKET_MESSAGE,
    payload: msg
});

export const onSocketErrorAction = (e) => ({
    type: SOCKET_ERROR,
    payload: e
});