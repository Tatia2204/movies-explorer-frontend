import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from '../../utils/MainApi';
import { MoviesCountConfig, MESSAGES, POPUP_MESSAGES } from '../../utils/constant';
import { removeItemFilms } from "../../utils/removeItemFilms";

const Movies = ({ openPopup }) => {
    const [films, setFilms] = useState(null);
    const [filmsSaved, setFilmsSaved] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [MoviesCount, setMoviesCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState(null);
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

    const localStorageFilmsInitial = localStorage.getItem('filmsInitial');
    const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');
    const localStorageFilms = localStorage.getItem('films');
    const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
    const JWT = localStorage.getItem('jwt');

    useEffect(() => {
        setMoviesCount(getMoviesCount());
        const handlerResize = () => setMoviesCount(getMoviesCount());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);

    function getMoviesCount() {
        let countCards;
        const clientWidth = document.documentElement.clientWidth;

        Object.keys(MoviesCountConfig)
            .sort((a, b) => a - b)
            .forEach((key) => {
                if (clientWidth > +key) {
                    countCards = MoviesCountConfig[key];
                }
            });

        return countCards;
    }

    function handleMore() {
        const spliceFilms = films;
        const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, MoviesCount[1]));
        setFilmsShowed(newFilmsShowed);
        setFilms(spliceFilms);
    }

    function filterFilms(data, inputSearch) {
        let filterData = data.filter(({ nameRU }) =>
            nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
        localStorage.setItem('films', JSON.stringify(filterData));
        localStorage.setItem('filmsInputSearch', inputSearch);

        const spliceData = filterData.splice(0, MoviesCount[0]);
        setFilmsShowed(spliceData);
        setFilms(filterData);
        setFilmsShowedWithTumbler(spliceData);
        setFilmsWithTumbler(filterData);
    }

    async function handleGetMovies(inputSearch) {
        setFilmsTumbler(false);
        localStorage.setItem('filmsTumbler', false);

        if (!inputSearch) {
            setErrorText(MESSAGES.NO_WORD);
            return false;
        }

        setErrorText('');
        setPreloader(true);

        try {
            if (localStorageFilmsInitial === null) {
                const data = await moviesApi.getInitialMovies();
                localStorage.setItem('filmsInitial', JSON.stringify(data));
                filterFilms(data, inputSearch);
            } else {
                const data = JSON.parse(localStorageFilmsInitial);
                filterFilms(data, inputSearch);
            }

        } catch (err) {
            setErrorText(MESSAGES.ERROR);

            setFilms([]);
            removeItemFilms();
        } finally {
            setPreloader(false);
        }
    }

    async function handleGetMoviesTumbler(tumbler) {
        let filterDataShowed = [];
        let filterData = [];

        if (tumbler) {
            setFilmsShowedWithTumbler(filmsShowed);
            setFilmsWithTumbler(films);
            filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
            filterData = films.filter(({ duration }) => duration <= 40);

            saveStorageForTumbler(filterDataShowed, filterData, tumbler);
        }
        else {
            if (localStorageFilmsInputSearch) {
                await handleGetMovies(localStorageFilmsInputSearch);
            } else {
                filterDataShowed = filmsShowedWithTumbler;
                filterData = filmsWithTumbler;

                saveStorageForTumbler(filterDataShowed, filterData, tumbler);
            }
        }
    }

    function saveStorageForTumbler(filterDataShowed, filterData, tumbler) {
        localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
        localStorage.setItem('filmsTumbler', tumbler);
        setFilmsShowed(filterDataShowed);
        setFilms(filterData);
    }

    async function savedMoviesToggle(film, favorite) {
        if (favorite) {
            const objFilm = {
                image: 'https://api.nomoreparties.co' + film.image.url,
                trailerLink: film.trailerLink,
                thumbnail: 'https://api.nomoreparties.co' + film.image.url,
                movieId: film.id,
                country: film.country || 'Неизвестно',
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                nameRU: film.nameRU,
                nameEN: film.nameEN,
            };
            try {
                await mainApi.addMovies(objFilm, JWT);
                const newSaved = await mainApi.getMovies(JWT);
                setFilmsSaved(newSaved);
            } catch (err) {
                openPopup(POPUP_MESSAGES.ERROR.ADD_FILM);
            }
        } else {
            try {
                await mainApi.deleteMovies(film._id, JWT);
                const newSaved = await mainApi.getMovies(JWT);
                setFilmsSaved(newSaved);
            } catch (err) {
                openPopup(POPUP_MESSAGES.ERROR.DELETE_FILM);
            }
        }
    }

    useEffect(() => {
        mainApi
            .getMovies(JWT)
            .then((data) => {
                setFilmsSaved(data);
            })
            .catch(() => {
                openPopup(POPUP_MESSAGES.ERROR.SERVER);
            });

        if (localStorageFilms) {
            const filterData = JSON.parse(localStorageFilms);
            setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
            setFilms(filterData);
            setPreloader(false);
        }

        if (localStorageFilmsTumbler) {
            setFilmsTumbler(localStorageFilmsTumbler === 'true');
        }

        if (localStorageFilmsInputSearch) {
            setFilmsInputSearch(localStorageFilmsInputSearch);
        }
    }, [openPopup]);

    return (
        <div className="movies">
            <SearchForm
                handleGetMovies={handleGetMovies}
                filmsTumbler={filmsTumbler}
                filmsInputSearch={filmsInputSearch}
                handleGetMoviesTumbler={handleGetMoviesTumbler} />
            {preloader && <Preloader />}
            {errorText && <div className="movies__text-error">{errorText}</div>}
            {!preloader && !errorText && films !== null && filmsSaved !== null && filmsShowed !== null && (
                <MoviesCardList
                    handleMore={handleMore}
                    filmsRemains={films}
                    films={filmsShowed}
                    savedMoviesToggle={savedMoviesToggle}
                    filmsSaved={filmsSaved}
                />
            )}
        </div>
    );
};

export default Movies;