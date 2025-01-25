import {openModal} from "./popup";
import {imagePopup} from "./image-popup";
import {store} from "./store";
import {apiAddCardLike, apiRemoveCard, apiRemoveCardLike} from "./api";

const cardTemplate = document.querySelector('#card-template')
const cardsContainer = document.querySelector('.places__list')

function createCard(data) {
    let likeCount = data.likes.length
    let liked = data.likes.map(it => it._id).includes(store.user._id)
    const myCard = data.owner._id === store.user._id

    const card = document.createElement('li')
    card.appendChild(document.importNode(cardTemplate.content, true))
    card.querySelector('.card__title').textContent = data.name
    card.querySelector('.card__image').src = data.link
    card.querySelector('.card__like-count').textContent = likeCount
    card.querySelector('.card__image').addEventListener('click', () => {
        imagePopup.querySelector('.popup__image').src = data.link
        imagePopup.querySelector('.popup__caption').textContent = data.name
        openModal(imagePopup)
    })

    const btn = card.querySelector('.card__like-button')
    btn.classList.toggle('card__like-button_is-active', liked)

    btn.addEventListener('click', async e => {
        liked = !liked
        try {
            if (liked) {

                await apiAddCardLike(data._id)
                card.querySelector('.card__like-count').textContent = ++likeCount
            } else {

                await apiRemoveCardLike(data._id)
                card.querySelector('.card__like-count').textContent = --likeCount
            }
            btn.classList.toggle('card__like-button_is-active', liked)
        } catch (e) {
            alert(e)
        }
    })

    const delBtn = card.querySelector('.card__delete-button')
    if (myCard) {
        delBtn.addEventListener('click', async e => {
            try {
                await apiRemoveCard(data._id)
                card.outerHTML = ''
            } catch (e) {
                alert(e)
            }
        })
    } else {
        delBtn.outerHTML = ''
    }
    return card
}

export function addCard(cardData) {
    cardsContainer.insertBefore(createCard(cardData), cardsContainer.firstChild)
}