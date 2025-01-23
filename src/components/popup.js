import {validation} from './validation'

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    const form = popup.querySelector('.popup__form')
    if (form) {
        validation.get(form).reset()
    }
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeByEsc);
}

function setupOverlayClose(popup) {
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

document.querySelectorAll('.popup').forEach(popup => {
    setupOverlayClose(popup)
    popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup))
})
