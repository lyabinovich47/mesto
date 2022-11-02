import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator, settings } from './FormValidator.js';


const elementsList = document.querySelector('.elements');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupBigPhoto = document.querySelector('.popup_type_big-photo');

const formAddCard = document.querySelector('.popup__container_type_elementAddForm');
const buttonAddCard = document.querySelector('.profile__add-button');

const buttonSubmiteAddCard = formAddCard.querySelector('.popup__submite-btn');

const containerBigPhoto = document.querySelector('.popup__big-photo-container');

const inputNameCard = formAddCard.querySelector('.popup__text_type_element-title');
const inputUrlCard = formAddCard.querySelector('.popup__text_type_element-url');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = document.querySelector('.popup__close-button');
const formEditProfile = document.querySelector('.popup__container_type_profileEditForm');

const inputNameFormEditProfile = document.querySelector('.popup__text_type_name');
const inputProfessionFormEditProfile = document.querySelector('.popup__text_type_profession');

const nameCurrentUser = document.querySelector('.profile__name');
const professionCurrentUser = document.querySelector('.profile__profession');

const buttonCloseBigPhoto = containerBigPhoto.querySelector('.popup__close-button');
const buttonCloseFormAddNewCard = formAddCard.querySelector('.popup__close-button');



function createCard(item) {

  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  return cardElement;

}

initialCards.forEach((item) => {

  elementsList.append(createCard(item));

});

export function openPopup(popup) {

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEscape);

}

function closePopup(popup) {

  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEscape);

}

function handleCloseByEscape(event) {

  if (event.key === 'Escape') {

    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);

  }
}

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

buttonCloseFormAddNewCard.addEventListener('click', () => {
  closePopup(popupAddCard);
  formAddCard.reset();
});

formAddCard.addEventListener('submit', (event) => {

  event.preventDefault();

  elementsList.prepend(createCard({
    name: inputNameCard.value,
    link: inputUrlCard.value,
  }));

  closePopup(popupAddCard);
  formAddCard.reset();

  buttonSubmiteAddCard.classList.add('popup__submit-btn_inactive'); // эти 2 строчки деактивируют кнопку "Сохранить" при повторном открытии попапа добавления карточки
  buttonSubmiteAddCard.setAttribute('disabled', true);              // это небольшое задвоение кода из функции toggleButtonState нужно будет изменить после прохождения темы "Модули в JS"

});


buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputNameFormEditProfile.value = nameCurrentUser.textContent;
  inputProfessionFormEditProfile.value = professionCurrentUser.textContent;
});

buttonCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  nameCurrentUser.textContent = inputNameFormEditProfile.value;
  professionCurrentUser.textContent = inputProfessionFormEditProfile.value;
  closePopup(popupEditProfile);

});


document.querySelectorAll('.popup').forEach((popup) => {

  popup.addEventListener('mousedown', (event) => {

    if (event.target.classList.contains("popup") || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
});

buttonCloseBigPhoto.addEventListener('click', () => {
  closePopup(popupBigPhoto);
});

const validatorEditProfile = new FormValidator(settings, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(settings, formAddCard);
validatorAddCard.enableValidation();
