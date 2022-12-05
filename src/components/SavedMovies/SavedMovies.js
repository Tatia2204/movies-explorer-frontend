import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { POPUP_MESSAGES, MESSAGES, SHORT_DURATION } from '../../utils/constant';

const SavedMovies = ({ openPopup }) => {
    const [films, setFilms] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [filmsShowed, setFilmsShowed] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);

    const JWT = localStorage.getItem('jwt');

    async function handleGetMovies(inputSearch, tumbler) {
        setErrorText('');
        setPreloader(true);

        try {
            const data = films;
            let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

            if (tumbler) filterData = filterData.filter(({ duration }) => duration <= SHORT_DURATION);

            setFilmsShowed(filterData);

        } catch (err) {
            setErrorText(MESSAGES.ERROR);

            setFilms([]);
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
            filterDataShowed = filmsShowed.filter(({ duration }) => duration <= SHORT_DURATION);
            filterData = films.filter(({ duration }) => duration <= SHORT_DURATION);
        }
        else {
            filterDataShowed = filmsShowedWithTumbler;
            filterData = filmsWithTumbler;
        }
        setFilmsShowed(filterDataShowed);
        setFilms(filterData);
    }

    async function savedMoviesToggle(film, favorite) {
        if (!favorite) {
            try {
                await mainApi.deleteMovies(film._id, JWT);
                const newFilms = await mainApi.getMovies(JWT);
                setFilmsShowed(newFilms);
                setFilms(newFilms);
            } catch (err) {
                openPopup(POPUP_MESSAGES.ERROR.ADD_FILM);
            }
        }
    }

    useEffect( () => {
        async function FilmList () {
            try {
                const data = await mainApi.getMovies(JWT);
                setFilms(data);
                setFilmsShowed(data);
            } catch (err) {
                openPopup(POPUP_MESSAGES.ERROR.SERVER);
            }
        }
        FilmList();
    }, [openPopup]);

    return (
        <div className="saved-movies">
            <SearchForm
                handleGetMovies={handleGetMovies}
                handleGetMoviesTumbler={handleGetMoviesTumbler} />
            {preloader && <Preloader />}
            {errorText && <div className="saved-movies__text-error">{errorText}</div>}
            {!preloader && !errorText && films !== null && (
                <MoviesCardList
                    filmsRemains={[]}
                    savedMoviesToggle={savedMoviesToggle}
                    films={filmsShowed}
                />
            )}
        </div>
    );
};

export default SavedMovies;