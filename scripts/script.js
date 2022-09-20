
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementTemplate = document.querySelector('.element-template').content;
const newElements = document.querySelector('.elements');
const bigPhotoTemplate = document.querySelector('.big-photo-template').content;
const bigPhotoContainer = document.querySelector('.page');

const popupElement = document.querySelector('.popup');
const elementAddForm = document.querySelector('.popup__container_type_elementAddForm');
const addElementButton = document.querySelector('.profile__add-button');

const newBigPhoto = bigPhotoTemplate.querySelector('.popup__big-photo-container').cloneNode(true);
const newBigPhotoImg = newBigPhoto.querySelector('.popup__big-photo');
const newBigPhotoTitle = newBigPhoto.querySelector('.popup__big-photo-title');

const newUserNameInput = elementAddForm.querySelector('.popup__text_type_element-title');
const newUserUrlInput = elementAddForm.querySelector('.popup__text_type_element-url');

const openProfileEditButton = document.querySelector('.profile__edit-button');
const closeProfileEditButton = document.querySelector('.popup__close-button');
const editProfileForm = document.querySelector('.popup__container_type_profileEditForm');
const profileFormNameInput = document.querySelector('.popup__text_type_name');
const profileFormProfessionInput = document.querySelector('.popup__text_type_profession');

let newName = document.querySelector('.profile__name');
let newProfession = document.querySelector('.profile__profession');

function renderElement (item) {

  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  const newElementPhoto = newElement.querySelector('.element__photo');
  const newElementTitle = newElement.querySelector('.element__title');
  const newElementDeleteButton = newElement.querySelector('.element__delete-btn');
  const newElementLikeButton = newElement.querySelector('.element__like-btn');

  newElementPhoto.src = item.link;
  newElementPhoto.alt = item.name;
  newElementTitle.textContent = item.name;

  newElementDeleteButton.addEventListener('click', deleteElementHandler);
  newElementLikeButton.addEventListener('click', likeElementHandler);
  newElementPhoto.addEventListener('click', bigPhotoHandler);

  if (popupElement.classList.contains('popup_type_form')) {
    newElements.prepend(newElement);
  } else {
    newElements.appendChild(newElement);
  }

}

function deleteElementHandler(event) {

  const currentElement = event.target.closest('.element');
  currentElement.remove();

}

function likeElementHandler(event) {

  event.target.classList.add('element__like-btn_active');

}

function bigPhotoHandler(event) {

  newBigPhotoImg.src = event.target.src;
  newBigPhotoTitle.textContent = event.target.alt;

  bigPhotoContainer.appendChild(newBigPhoto);

  popupElement.classList.add('popup_type_big-photo');
  newBigPhoto.classList.add('popup__big-photo-container_opened');

  const newBigPhotoCloseButton = newBigPhoto.querySelector('.popup__close-button');

  newBigPhotoCloseButton.addEventListener('click', bigPhotoCloseHandler);

}

function bigPhotoCloseHandler() {

  popupElement.classList.remove('popup_type_big-photo');
  newBigPhoto.classList.remove('popup__big-photo-container_opened');
}

function renderElements() {
  initialElements.forEach(renderElement);
}

renderElements();

function addNewElementFormHandler() {

  popupElement.classList.add('popup_type_form');
  elementAddForm.classList.add('popup__container_opened');

  const closePopupButton = elementAddForm.querySelector('.popup__close-button');
  closePopupButton.addEventListener('click', closeNewElementFormHendler );

  elementAddForm.addEventListener('submit', addFormSubmitHandler);

}

function addFormSubmitHandler(event) {

  event.preventDefault();

  const newUserElement = {
    name: '',
    link: '',
  };

  newUserElement.name = newUserNameInput.value;
  newUserElement.link = newUserUrlInput.value;

  renderElement(newUserElement);

  closeNewElementFormHendler();

}

function closeNewElementFormHendler() {

  popupElement.classList.remove('popup_type_form');
  elementAddForm.classList.remove('popup__container_opened');

  newUserNameInput.value = '';
  newUserUrlInput.value = '';
}

function openProfileEditButtonHandler() {

  popupElement.classList.add('popup_type_form');
  editProfileForm.classList.add('popup__container_opened');

  profileFormNameInput.value = newName.textContent;
  profileFormProfessionInput.value = newProfession.textContent;

}

function closeProfileEditButtonHandler() {
  popupElement.classList.remove('popup_type_form');
  editProfileForm.classList.remove('popup__container_opened');
}

function editProfileFormSubmitHandler(event) {

  event.preventDefault();

  newName.textContent = profileFormNameInput.value;
  newProfession.textContent = profileFormProfessionInput.value;

  closeProfileEditButtonHandler();

}

addElementButton.addEventListener('click', addNewElementFormHandler );
openProfileEditButton.addEventListener('click', openProfileEditButtonHandler);
closeProfileEditButton.addEventListener('click', closeProfileEditButtonHandler);
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);




