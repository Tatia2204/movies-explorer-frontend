import { checkResponse, BASE_URL, MOVIES_URL } from './constant';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

// Регистрация пользователя
export const registerUser = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, email, password }),
    }).then((res) => checkResponse(res));
}

// Авторизация пользователя
export const loginUser = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    }).then((res) => checkResponse(res));
}
// получение всех фильмов
export const getInitialMovies = (token) => {
    return fetch(`${MOVIES_URL}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            ...headers,
            'Authorization' : `Bearer ${token}`,
        },
    }).then((res) => checkResponse(res));
};
