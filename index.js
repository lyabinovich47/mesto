const popupElement = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

const togglePopup = () => {
  popupElement.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', () => {
  togglePopup();
})

closePopupButton.addEventListener('click', () => {
  togglePopup();
})

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let professionInput = document.querySelector('.popup__profession');


function formSubmitHandler(event) {

  event.preventDefault();

  let newName = document.querySelector('.profile__name');
  newName.textContent = nameInput.value;

  let newProfession = document.querySelector('.profile__profession');
  newProfession.textContent = professionInput.value;

  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


