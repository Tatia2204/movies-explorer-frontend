import { checkResponse, BASE_URL } from './constant';

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
export const getInitialMovies = () => {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
        method: 'GET',
        headers,
    }).then((res) => checkResponse(res));
};
