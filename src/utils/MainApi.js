import { checkResponse, BASE_URL, JWT } from './constant';

class MainApi {
    constructor(options) {
        this._address = options.address;
    }

    // Получаем информацию о пользователе
    getUserInfo(jwt) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }).then((res) => checkResponse(res));
    }

    // Обновляем информацию о пользователе
    updateUserInfo(data, jwt) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            }),
        }).then((res) => checkResponse(res));
    }

    // Получаем все сохраненные фильмы пользователя
    getMovies(jwt) {
        return fetch(`${this._address}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        }).then((res) => checkResponse(res));
    }

    // Сохраняем фильм пользователя
    addMovies(data, jwt) {
        return fetch(`${this._address}/movies`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            body: JSON.stringify(data),
        }).then((res) => checkResponse(res));
    }

    // Удаляем фильм пользователя
    deleteMovies(movieId, jwt) {
        return fetch(`${this._address}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        }).then((res) => checkResponse(res));
    }
}

const mainApi = new MainApi({
    address: BASE_URL,
    headers: {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json',
    },
});

export default mainApi;
