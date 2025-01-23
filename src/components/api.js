import {mergician} from 'mergician';

const BASE_URL = 'https://nomoreparties.co/v1/apf-cohort-202'
const AUTH_OPTIONS = {
    headers: {
        authorization: 'ed59a4b9-2d3f-4a55-8f07-00090e394e7f'
    }
}

function processResponse(resp) {
    return resp
        .then(it => {
            if (!it.ok) {
                throw 'Request failed'
            }
            return it
        })
        .then(it => it.json())
}

export function apiGetCurrentUser() {
    return processResponse(fetch(
        `${BASE_URL}/users/me`,
        mergician(AUTH_OPTIONS, {})
    ))
}

export function apiUpdateCurrentUser(data) {
    return processResponse(fetch(
        `${BASE_URL}/users/me`,
        mergician(AUTH_OPTIONS, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
    ))
}

export function apiGetCards() {
    return processResponse(fetch(
        `${BASE_URL}/cards`,
        mergician(AUTH_OPTIONS, {})
    ))
}

export function apiAddCard(data) {
    return processResponse(fetch(
        `${BASE_URL}/cards`,
        mergician(AUTH_OPTIONS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    ))
}

export function apiAddCardLike(id) {
    return processResponse(fetch(
        `${BASE_URL}/cards/likes/${id}`,
        mergician(AUTH_OPTIONS, {
            method: 'PUT',
        })
    ))
}

export function apiRemoveCardLike(id) {
    return processResponse(fetch(
        `${BASE_URL}/cards/likes/${id}`,
        mergician(AUTH_OPTIONS, {
            method: 'DELETE',
        })
    ))
}

export function apiRemoveCard(id) {
    return processResponse(fetch(
        `${BASE_URL}/cards/${id}`,
        mergician(AUTH_OPTIONS, {
            method: 'DELETE',
        })
    ))
}

export function apiUpdateAvatar(url) {
    return processResponse(fetch(
        `${BASE_URL}/users/me/avatar`,
        mergician(AUTH_OPTIONS, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url
            })
        })
    ))
}