
export class Card {
  constructor(item, selector, handleCardClick) {

    this._name = item.name;
    this._link = item.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;

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
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardDeleteBtn = this._element.querySelector('.element__delete-btn');
    this._cardLikeBtn = this._element.querySelector('.element__like-btn');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {

    this._cardDeleteBtn.addEventListener('click', () => this._deleteCard());

    this._cardLikeBtn.addEventListener('click', () => this._toggleLikeCard());

    this._cardImage.addEventListener('click', () => this._handleCardClick());

  }

  _deleteCard() {
    this._cardDeleteBtn.closest('.element').remove();
  }

  _toggleLikeCard() {
    this._cardLikeBtn.classList.toggle('element__like-btn_active');
  }

}
