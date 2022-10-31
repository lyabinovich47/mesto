
const elementTemplate = document.querySelector('.element-template').content;
const elementsList = document.querySelector('.elements');

const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupBigPhoto = document.querySelector('.popup_type_big-photo');

const formAddCard = document.querySelector('.popup__container_type_elementAddForm');
const buttonAddCard = document.querySelector('.profile__add-button');

const buttonSubmiteAddCard = formAddCard.querySelector('.popup__submite-btn');

const containerBigPhoto = document.querySelector('.popup__big-photo-container');
const imageBigPhoto = document.querySelector('.popup__big-photo');
const titleBigPhoto = document.querySelector('.popup__big-photo-title');

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

  return card;

}

function renderCard(item) {

  elementsList.prepend(createCard(item));

}

function renderCards(cards) {

  cards.reverse().forEach(renderCard);

}

renderCards(initialCards);

function deleteCard(event) {

  const currentElement = event.target.closest('.element');
  currentElement.remove();

}

function toggleLikeCard(event) {

  event.target.classList.toggle('element__like-btn_active');

}


function openPopup(popup) {

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

function handleBigPhoto(event) {

  imageBigPhoto.src = event.target.src;
  imageBigPhoto.alt = event.target.alt;
  titleBigPhoto.textContent = event.target.alt;

  openPopup(popupBigPhoto);

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

  renderCard({
    name: inputNameCard.value,
    link: inputUrlCard.value,
  });

  closePopup(popupAddCard);
  formAddCard.reset();

  buttonSubmiteAddCard.classList.add('popup__submit-btn_inactive'); // ! эти 2 строчки деактивируют кнопку Сохранить при
  buttonSubmiteAddCard.setAttribute('disabled', true);              // ! повторном открытии попапа добавления карточки
  // ! и это небольшое задвоение кода из функции toggleButtonState()
});                                                                 // ! нужно будет изменить после прохождения темы "Модули в JS"


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
