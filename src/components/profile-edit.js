import {closeModal, openModal} from "./popup";
import {apiUpdateCurrentUser, apiUpdateAvatar, apiAddCard} from "./api";

const profilePopup = document.querySelector('.popup.popup_type_edit')
const profileImage = document.querySelector('.profile__image')
const profileInfo = document.querySelector('.profile__info')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditForm = document.querySelector('.popup_type_edit .popup__form')
const profileImageEditButton = document.querySelector('.profile__image-overlay')
const profileImagePopup = document.querySelector('.popup_type_image_edit')
const profileEditImageForm = document.querySelector('.popup_type_image_edit .popup__form')
const profilePopupSubmitButton = document.querySelector('.popup_type_edit .popup__button')
const profileImagePopupSubmitButton = document.querySelector('.popup_type_image_edit .popup__button')


profileImageEditButton.addEventListener('click', () => {
    let profileImageURL = profileImage.style.backgroundImage
    profileImagePopup.querySelector('.popup__input_type_url').value = profileImageURL.substring(5, profileImageURL.length - 2);
    openModal(profileImagePopup)
})

profileEditImageForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newURL = profileImagePopup.querySelector('.popup__input_type_url').value
    profileImagePopupSubmitButton.textContent = 'Сохранение...'
    try {
        const user = await apiUpdateAvatar(newURL)
        updateProfileImage(user.avatar)
        closeModal(profileImagePopup)
    } catch (e) {
        alert(e)
    } finally {
        profileImagePopupSubmitButton.textContent = 'Сохранить'
    }

})

profileEditButton.addEventListener('click', () => {
    profilePopup.querySelector('.popup__input_type_name').value = profileInfo.querySelector('.profile__title').textContent
    profilePopup.querySelector('.popup__input_type_description').value = profileInfo.querySelector('.profile__description').textContent
    openModal(profilePopup)
})

export function updateProfileInfo(data) {
    profileInfo.querySelector('.profile__title').textContent = data.name
    profileInfo.querySelector('.profile__description').textContent = data.description
}

export function updateProfileImage(url) {
    profileImage.style.backgroundImage = `url(${url})`
}


profileEditForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newData = {
        name: profilePopup.querySelector('.popup__input_type_name').value,
        description: profilePopup.querySelector('.popup__input_type_description').value
    }
    profilePopupSubmitButton.textContent = 'Сохранение...'
    try {
        const user = await apiUpdateCurrentUser(newData)
        updateProfileInfo({
            name: user.name,
            description: user.about
        })
        closeModal(profilePopup)
    } catch (e) {
        alert(e)
    } finally {
        profilePopupSubmitButton.textContent = 'Сохранить'
    }
})