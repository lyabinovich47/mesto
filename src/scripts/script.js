import {
  initialCards, cardListSelector, popupEditProfile, popupAddCard, formAddCard, buttonAddCard, buttonEditProfile,
  formEditProfile, inputNameFormEditProfile, inputProfessionFormEditProfile, settings
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

function createCard(item) {

  const card = new Card(item, '.element-template', () => imageBigPhoto.open(item.name, item.link));
  const cardElement = card.generateCard();
  return cardElement;

}

const cardsList = new Section({

  items: initialCards,
  renderer: item => cardsList.addItem(createCard(item))
}, cardListSelector);

cardsList.renderItems();

buttonAddCard.addEventListener('click', () => { // добавили слушатель на кнопку добавления карточки
  addCardPopup.open(popupAddCard);
});

const handleCardFormSubmit = (event, data) => { // обработчик сабмита формы добавления карточки

  event.preventDefault();

  const card = createCard({
    name: data['elementTitle'],
    link: data['elementUrl']
  });

  cardsList.addItem(card);
  addCardPopup.close();
  validatorAddCard.resetValidation();

};

buttonEditProfile.addEventListener('click', () => { // добавили слушатель на кнопку редактирования профиля

  editProfilePopup.open(popupEditProfile);
  const { name, profession } = userInfo.getUserInfo();
  inputNameFormEditProfile.value = name;
  inputProfessionFormEditProfile.value = profession;

});

const handleEditProfileFormSubmit = (event, data) => {   // обработчик сабмита формы редактирования профиля

  event.preventDefault();
  const { name, profession } = data;
  userInfo.setUserInfo(name, profession);
  editProfilePopup.close();

};

const imageBigPhoto = new PopupWithImage('.popup_type_big-photo');
imageBigPhoto.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileProfessionSelector: '.profile__profession'
});

const validatorEditProfile = new FormValidator(settings, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(settings, formAddCard);
validatorAddCard.enableValidation();
