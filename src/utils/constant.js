export const checkResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(
            new Error(`Ошибка ${res.status}: ${res.statusText}`)
        );
};
export const BASE_URL = 'https://api.kami2022.nomoredomains.icu';

export const POPUP_MESSAGES = {
    SUCCESSFULLY: {
        REGISTER: 'Вы успешно зарегистрировались!',
        UPDATE_PROFILE: 'Данные успешно изменены!'
    },

    ERROR: {
        DELETE_FILM: 'Во время удаления фильма произошла ошибка.',
        ADD_FILM: 'Во время добавления фильма произошла ошибка.',
        SERVER: 'Ошибка сервера.',
        REGISTER: 'Что-то пошло не так! Ошибка регистрации.',
        LOGIN: 'Что-то пошло не так! Ошибка авторизации.',
        ERROR: 'Что-то пошло не так!',
        ERROR_TOKEN: 'Что-то пошло не так!' +
            'Токен не передан или передан не в том формате.',
        ERROR_TOKEN_2: 'Что-то пошло не так!' +
            'Переданный токен некорректен.'
    }
}

export const MESSAGES = {
    NO_WORD: 'Нужно ввести ключевое слово',
    NOT_FOUND: 'Ничего не найдено',
    ERROR: 'Во время запроса произошла ошибка. ' +
        'Возможно, проблема с соединением или сервер недоступен. ' +
        'Подождите немного и попробуйте ещё раз'
}

export const MoviesCountConfig = {
    '1300': [12, 4],
    '1004': [12, 3],
    '800': [12, 2],
    '767': [8, 2],
    '480': [7, 7],
    '240': [5, 1],
};

export const SHORT_DURATION = 40;