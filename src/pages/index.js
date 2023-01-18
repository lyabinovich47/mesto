import {
  initialCards, cardListSelector, popupEditProfile, popupAddCard, formAddCard, buttonAddCard, buttonEditProfile,
  formEditProfile, inputNameFormEditProfile, inputProfessionFormEditProfile, settings, buttonEditAvatar, formUpdateAvatar
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';

import './index.css';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'a68b3d82-1603-42e3-8955-1f9a3567159b',
    'Content-Type': 'application/json'
  }
});

// api.getProfile()
//   .then((data) => {
//     userInfo.setUserInfo(data.name, data.about, data.avatar);
//     userId = data._id;
//   });

// api.getInitialCards()
//   .then((cards) => {
//     cards.forEach(data => {
//       const card = createCard({
//         name: data.name,
//         link: data.link,
//         likes: data.likes,
//         id: data._id,
//         userId: userId,
//         ownerId: data.owner._id
//       });

//       cardsList.addItem(card);
//     });

//   });

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([data, cards]) => {

    userInfo.setUserInfo(data.name, data.about, data.avatar);
    userId = data._id;

    cards.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });

      cardsList.addItem(card);
    });

  });

function createCard(item) {

  const card = new Card(
    item,
    '.element-template',
    () => {
      imageBigPhoto.open(item.name, item.link);
    },
    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.removeCard();
            confirmPopup.close();
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
          });
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes);
          });
      }
    }
  );

  const cardElement = card.generateCard();
  return cardElement;

}

const cardsList = new Section({

  items: [],
  renderer: item => cardsList.addItem(createCard(item))
}, cardListSelector);

cardsList.renderItems();

buttonAddCard.addEventListener('click', () => { // добавили слушатель на кнопку добавления карточки
  addCardPopup.open();
  validatorAddCard.resetValidation();
});

const handleCardFormSubmit = (event, data) => { // обработчик сабмита формы добавления карточки

  event.preventDefault();

  addCardPopup.renderSubmitBtnText('Сохранение...');

  api.addCard(data['elementTitle'], data['elementUrl'])
    .then(res => {

      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });

      cardsList.addItem(card);
      addCardPopup.close();

    })
    .finally(() => {
      addCardPopup.renderSubmitBtnText('Создать');
    });

};

buttonEditProfile.addEventListener('click', () => { // добавили слушатель на кнопку редактирования профиля

  editProfilePopup.open();
  const { name, profession } = userInfo.getUserInfo();
  inputNameFormEditProfile.value = name;
  inputProfessionFormEditProfile.value = profession;
  validatorEditProfile.resetValidation();


});

buttonEditAvatar.addEventListener('click', () => { //! добавили слушатель на обертку аватарки
  avatarPopup.open();
});

const handleEditProfileFormSubmit = (event, data) => {   // обработчик сабмита формы редактирования профиля

  event.preventDefault();

  const { name, profession } = data;

  editProfilePopup.renderSubmitBtnText('Сохранение...');

  api.editProfile(name, profession)
    .then(data => {
      userInfo.setUserInfo(data.name, data.about, data.avatar); //! добавил аватар
      editProfilePopup.close();

    })
    .finally(() => {
      editProfilePopup.renderSubmitBtnText('Сохранить');
    });

};

const imageBigPhoto = new PopupWithImage('.popup_type_big-photo');
imageBigPhoto.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();



const confirmPopup = new PopupWithConfirmation('.popup_type_delete-confirm');
confirmPopup.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileProfessionSelector: '.profile__profession',
  profileAvatarSelector: '.profile__avatar'                   //! добавил селектор аватарки
});



const handleNewAvatarFormSubmit = (event) => {                 //! обработчик сабмита формы изменения аватарки

  event.preventDefault();
  const newAvatar = formUpdateAvatar.avatar.value;

  avatarPopup.renderSubmitBtnText('Сохранение...');

  api.updateAvatar(newAvatar)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      avatarPopup.close();
    })
    .finally(() => {
      avatarPopup.renderSubmitBtnText('Сохранить');
    });

};

const avatarPopup = new PopupWithForm('.popup_type_new-avatar', handleNewAvatarFormSubmit);  //! создали попап изменения аватарки
avatarPopup.setEventListeners();                                                            //! навесили слушатели



const validatorEditProfile = new FormValidator(settings, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(settings, formAddCard);
validatorAddCard.enableValidation();
