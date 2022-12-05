export const removeItemFilms = () => {
    localStorage.removeItem('filmsInitial');
    localStorage.removeItem('films');
    localStorage.removeItem('filmsTumbler');
    localStorage.removeItem('filmsInputSearch');
}
