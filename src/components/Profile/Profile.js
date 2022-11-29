import './Profile.css';
import { useState } from 'react';
import mainApi from '../../utils/MainApi';
import { POPUP_MESSAGES } from '../../utils/constant';

const Profile = ({ onSignOut, openPopup, currentUser }) => {
    const [name, setName] = useState(currentUser.name);
    const [lastName, setLastName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [lastEmail, setLastEmail] = useState(currentUser.email);
    const [isVisibleButton, setVisibleButton] = useState(false);

    const JWT = localStorage.getItem('jwt');

    const handleSubmit = (evt) => {
        evt.preventDefault();

        mainApi.updateUserInfo({ name, email }, JWT).then(() => {
            setVisibleButton(false);
            setLastName(name);
            setLastEmail(email);
            openPopup(POPUP_MESSAGES.SUCCESSFULLY.UPDATE_PROFILE);
        })
            .catch(() => {
                openPopup(POPUP_MESSAGES.ERROR.ERROR);
            });
    };

    function handleNameChange(evt) {
        const value = evt.target.value;
        setName(value);
        currentUser.name = value;
        if (value !== lastName) {
            setVisibleButton(true);
        } else {
            setVisibleButton(false);
        }
    }

    function handleEmailChange(evt) {
        const value = evt.target.value;
        setEmail(value);
        currentUser.email = value;
        if (value !== lastEmail) {
            setVisibleButton(true);
        } else {
            setVisibleButton(false);
        }
    }

    return (
        <section className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <h3 className="profile__greeting">Привет, {name}!</h3>
                <div className="profile__inputs">
                    <p className="profile__text">Имя</p>
                    <div className="profile__area profile__area_type_name">
                        <input
                            className="profile__settings"
                            name="name"
                            type='text'
                            minLength='2'
                            maxLength='30'
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="profile__area profile__area_type_email">
                        <input
                            className="profile__settings"
                            name='email'
                            type='email'
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <p className="profile__text">E-mail</p>
                </div>
                <button className="profile__button" disabled={!isVisibleButton}>
                    Редактировать
                </button>
                <button className="profile__link" type="button" onClick={onSignOut}>
                    Выйти из аккаунта
                </button>
            </form>
        </section>
    );
};

export default Profile;