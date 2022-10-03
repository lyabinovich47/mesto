
const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements');
const templateBigPhoto = document.querySelector('.big-photo-template').content;
const page = document.querySelector('.page');

const popup = document.querySelector('.popup');
const formAddCard = document.querySelector('.popup__container_type_elementAddForm');
const buttonAddCard = document.querySelector('.profile__add-button');

const containerBigPhoto = templateBigPhoto.querySelector('.popup__big-photo-container').cloneNode(true);
const imageBigPhoto = containerBigPhoto.querySelector('.popup__big-photo');
const titleBigPhoto = containerBigPhoto.querySelector('.popup__big-photo-title');

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

let newCard;

function createCard(item) {

  const card = elementTemplate.querySelector('.element').cloneNode(true);
  const photoCard = card.querySelector('.element__photo');
  const titleCard = card.querySelector('.element__title');
  const buttonDeleteCard = card.querySelector('.element__delete-btn');
  const buttonLikeCard = card.querySelector('.element__like-btn');

  photoCard.src = item.link;
  photoCard.alt = item.name;
  titleCard.textContent = item.name;

  buttonDeleteCard.addEventListener('click', deleteCard);
  buttonLikeCard.addEventListener('click', toggleLikeCard);
  photoCard.addEventListener('click', handleBigPhoto);

  newCard = card;

  return newCard;

}

function renderCard(item) {

  createCard(item);

  if (popup.classList.contains('popup_type_form')) {

    elementsList.prepend(newCard);

  } else {

    elementsList.append(newCard);

  }

}

function renderCards() {

  initialCards.forEach(renderCard);
}

renderCards();

function deleteCard(event) {

  const currentElement = event.target.closest('.element');
  currentElement.remove();

}

function toggleLikeCard(event) {

  event.target.classList.toggle('element__like-btn_active');

}

function openPopup(event) {
  if (event.target.classList.contains('element__photo')) {
    popup.classList.add('popup_type_big-photo');
    containerBigPhoto.classList.add('popup__big-photo-container_opened');
  } else if (event.target.classList.contains('profile__add-button')) {
    popup.classList.add('popup_type_form');
    formAddCard.classList.add('popup__container_opened');
  } else if (event.target.classList.contains('profile__edit-button')) {
    popup.classList.add('popup_type_form');
    formEditProfile.classList.add('popup__container_opened');
  }
}

function closePopup(event) {
  if (event.target.classList.contains('popup__close-button')) {
    popup.classList.remove('popup_type_big-photo');
    containerBigPhoto.classList.remove('popup__big-photo-container_opened');
    popup.classList.remove('popup_type_form');
    formAddCard.classList.remove('popup__container_opened');
    formEditProfile.classList.remove('popup__container_opened');
  } else if (event.target.classList.contains('popup__container_type_elementAddForm')) {
    popup.classList.remove('popup_type_form');
    formAddCard.classList.remove('popup__container_opened');
  } else if (event.target.classList.contains('popup__container_type_profileEditForm')) {
    popup.classList.remove('popup_type_form');
    formEditProfile.classList.remove('popup__container_opened');
  }
}

function handleBigPhoto(event) {

  imageBigPhoto.src = event.target.src;
  titleBigPhoto.textContent = event.target.alt;

  page.appendChild(containerBigPhoto);

  openPopup(event);

}

function handleCloseBigPhoto(event) {

  closePopup(event);

}

function handleFormAddNewCard(event) {

  openPopup(event);

  buttonCloseFormAddNewCard.addEventListener('click', handleButtonCloseNewCardForm);

  formAddCard.addEventListener('submit', handleSubmitNewCard);

}

function handleSubmitNewCard(event) {

  event.preventDefault();

  const userNewCard = {

    name: '',
    link: '',

  };

  userNewCard.name = inputNameCard.value;
  userNewCard.link = inputUrlCard.value;

  renderCard(userNewCard);

  handleButtonCloseNewCardForm(event);

}

function handleButtonCloseNewCardForm(event) {

  closePopup(event);

  formAddCard.reset();

}

function handleButtonOpenEditProfile(event) {

  openPopup(event);

  inputNameFormEditProfile.value = nameCurrentUser.textContent;
  inputProfessionFormEditProfile.value = professionCurrentUser.textContent;

}

function handleButtonCloseEditProfile(event) {

  closePopup(event);

}

function handleSubmitProfile(event) {

  event.preventDefault();

  nameCurrentUser.textContent = inputNameFormEditProfile.value;
  professionCurrentUser.textContent = inputProfessionFormEditProfile.value;

  handleButtonCloseEditProfile(event);

}

buttonAddCard.addEventListener('click', handleFormAddNewCard);
buttonEditProfile.addEventListener('click', handleButtonOpenEditProfile);
buttonCloseEditProfile.addEventListener('click', handleButtonCloseEditProfile);
formEditProfile.addEventListener('submit', handleSubmitProfile);
buttonCloseBigPhoto.addEventListener('click', handleCloseBigPhoto);
