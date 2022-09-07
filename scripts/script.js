// constants

const popupElement = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__text_type_name');
let professionInput = document.querySelector('.popup__text_type_profession');

let newName = document.querySelector('.profile__name');
let newProfession = document.querySelector('.profile__profession');

// functions

function togglePopup() {

  if (!popupElement.classList.contains('popup_opened')) {
    nameInput.value = document.querySelector('.profile__name').textContent;
    professionInput.value = document.querySelector('.profile__profession').textContent;
  }
  
  popupElement.classList.toggle('popup_opened');
}

function formSubmitHandler(event) {

  event.preventDefault();

  newName.textContent = nameInput.value;
  newProfession.textContent = professionInput.value;

  togglePopup();
}

// listeners

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);


