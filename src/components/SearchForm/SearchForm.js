import './SearchForm.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import icon from "../../images/icon-search.svg";

const SearchForm = ({ handleGetMovies, filmsTumbler, filmsInputSearch, handleGetMoviesTumbler }) => {
    const [inputSearch, setInputSearch] = useState('');
    const [tumbler, setTumbler] = useState(false);
    const { pathname } = useLocation();

    function handleInputChange(evt) {
        setInputSearch(evt.target.value);
    }

    function handleTumblerChange() {
        const newTumbler = !tumbler;
        setTumbler(newTumbler);
        handleGetMoviesTumbler(newTumbler);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleGetMovies(inputSearch);
    }

    useEffect(() => {
        if (pathname !== '/saved-movies') {
            setTumbler(filmsTumbler);
            setInputSearch(filmsInputSearch);
        }
        else {
            setTumbler(tumbler);
            setInputSearch(inputSearch);
        }
        }, [filmsTumbler, filmsInputSearch]);

    return (
        <form className="search">
            <div className="search__container">
                <label className='search__input-label' htmlFor='movie'>
                    <img className="search__icon" src={icon} alt="Поиск" />
                </label>
                <input className="search__input"
                       placeholder="Фильм"
                       type="text"
                       value={inputSearch || ''}
                       onChange={handleInputChange}
                       required />
                <div className="search__button_border">
                    <button type="submit"
                            className="search__button"
                            onClick={handleSubmit}>Найти</button>
                </div>
                <div className="search__toggle">
                    <label className="search__tumbler">
                        <input className="search__checkbox"
                               type="checkbox"
                               checked={tumbler}
                               onChange={handleTumblerChange} />
                        <span className="search__slider" />
                    </label>
                    <p className="search__films">Короткометражки</p>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;