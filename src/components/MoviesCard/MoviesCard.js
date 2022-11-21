import './MoviesCard.css';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({ film, savedMoviesToggle, filmsSaved }) => {
    const { pathname } = useLocation();
    const [favorite, setFavorite] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    function handleFavoriteToogle() {
        const newFavorite = !favorite;
        const savedFilm = filmsSaved.filter((obj) => {
            return obj.movieId === film.id && currentUser._id === obj.owner;
        });
        savedMoviesToggle({ ...film, _id: savedFilm.length > 0 ?
                savedFilm[0]._id : null }, newFavorite);
    }

    function handleFavoriteDelete() {
        savedMoviesToggle(film, false);
    }

    function getMovieDuration(mins) {
        return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
    }

    useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedFilm = filmsSaved.filter((obj) => {
                return obj.movieId === film.id && currentUser._id === obj.owner;
            });

            if (savedFilm.length > 0) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }
        }
    }, [pathname, filmsSaved, film.id]);

    return (
        <>
            {pathname === '/saved-movies' && currentUser._id === film.owner && (
            <li className="card">
                <a className="card__image-content" href={film.trailer} target="_blank"  rel="noreferrer">
                    <img className="card__image" src={`${film.image}`} alt={film.nameRU}/>
                </a>
                <div className="card__element">
                    <p className="card__title">{film.nameRU}</p>
                    <div className="card__buttons">
                        <button type="button" className="card__button card__button_delete" onClick={handleFavoriteDelete} />
                    </div>
                </div>
                <p className="card__duration">{getMovieDuration(film.duration)}</p>
            </li>
            )}
            {pathname === '/movies' && (
            <li className="card">
                <a className="card__image-content" href={film.trailerLink} target="_blank"  rel="noreferrer">
                    <img className="card__image" src={`https://api.nomoreparties.co${film.image.url}`} alt={film.nameRU}/>
                </a>
                <div className="card__element">
                    <p className="card__title">{film.nameRU}</p>
                    <div className="card__buttons">
                        <button
                            type="button"
                            className={`card__button card__button${favorite ? '_active' : '_inactive'}`}
                            onClick={handleFavoriteToogle} />
                    </div>
                </div>
                <p className="card__duration">{getMovieDuration(film.duration)}</p>
            </li>
            )
        }
        </>
    );
};

export default MoviesCard;