import {closeModal, openModal} from "./popup";
import {addCard} from "./cards";
import {apiAddCard} from "./api";

const cardAddButton = document.querySelector('.profile__add-button')
const cardAddForm = document.querySelector('.popup_type_new-card .popup__form')
const cardPopup = document.querySelector('.popup.popup_type_new-card')
const cardPopupSubmitButton = document.querySelector('.popup_type_new-card .popup__button')

cardAddButton.addEventListener('click', () => openModal(cardPopup))

cardAddForm.addEventListener('submit', async e => {
    e.preventDefault()
    cardPopupSubmitButton.textContent = 'Сохранение...'
    try {
        const newData = {
            name: cardPopup.querySelector('.popup__input_type_card-name').value,
            link: cardPopup.querySelector('.popup__input_type_url').value,
        }
        const serverData = await apiAddCard(newData)
        addCard(serverData)
        closeModal(cardPopup)
    } catch (e) {
        alert(e)
    } finally {
        cardPopupSubmitButton.textContent = 'Сохранить'
    }
})