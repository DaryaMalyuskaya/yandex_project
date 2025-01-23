import './../pages/index.css'
import './add-card'
import './api'
import './cards'
import './image-popup'
import './popup'
import './profile-edit'
import './validation'
import {apiGetCards, apiGetCurrentUser} from "./api";
import {updateProfileImage, updateProfileInfo} from "./profile-edit";
import {addCard} from "./cards";
import {store} from "./store";

async function main() {
    try {
        const [user, cards] = await Promise.all([
            apiGetCurrentUser(),
            apiGetCards()
        ])
        store.user = user;
        console.info(store)

        updateProfileInfo({
            name: user.name,
            description: user.about
        })
        updateProfileImage(user.avatar)
        for (let cardData of cards.reverse()) {
            addCard(cardData)
        }

        document.querySelector('.loader').style.display = 'none'
    } catch (e) {
        alert(e)
    }
}

main()