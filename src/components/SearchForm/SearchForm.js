import './SearchForm.css';
import icon from "../../images/icon-search.svg";

const SearchForm = () => {
    return (
        <form className="search">
            <div className="search__container">
                <label className='search__input-label' htmlFor='movie'>
                    <img className="search__icon" src={icon} alt="Поиск"></img>
                </label>
                <input className="search__input" placeholder="Фильм" type="text" required />
                <div className="search__button_border">
                    <button type="submit" className="search__button">Найти</button>
                </div>
                <div className="search__toggle">
                    <label className="search__tumbler">
                        <input type="checkbox" className="search__checkbox" />
                        <span className="search__slider" />
                    </label>
                    <p className="search__films">Короткометражки</p>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;