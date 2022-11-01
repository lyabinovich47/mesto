
import { openPopup, popupBigPhoto } from './script.js';

export class Card {
  constructor(item, selector) {
    this._name = item.name;
    this._link = item.link;
    this._selector = selector;
  }

  _getElement() {
    const elementTemplate = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementTemplate;
  }

  generateCard() {
    this._element = this._getElement();
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__like-btn').addEventListener('click', () => {
      this._toggleLikeCard();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleBigPhoto();
    });

  }

  _deleteCard() {
    this._element.querySelector('.element__delete-btn').closest('.element').remove();
  }

  _toggleLikeCard() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
  }

  _handleBigPhoto() {

    const imageBigPhoto = document.querySelector('.popup__big-photo');
    const titleBigPhoto = document.querySelector('.popup__big-photo-title');

    imageBigPhoto.src = this._element.querySelector('.element__photo').src;
    imageBigPhoto.alt = this._element.querySelector('.element__photo').alt;
    titleBigPhoto.textContent = this._element.querySelector('.element__photo').alt;

    openPopup(popupBigPhoto);
  }
}
