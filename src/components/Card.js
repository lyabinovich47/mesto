
export class Card {
  constructor(item, selector, handleCardClick, handleDeleteClick, handleLikeClick) {

    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.id;
    this._userId = item.userId;
    this._ownerId = item.ownerId;

    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

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
    this._cardLikeCount = this._element.querySelector('.element__like-count');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardDeleteBtn.style.display = 'none';
    }

    return this._element;
  }

  _setEventListeners() {

    this._cardDeleteBtn.addEventListener('click', () => this._handleDeleteClick(this._id));

    this._cardLikeBtn.addEventListener('click', () => this._handleLikeClick(this._id));

    this._cardImage.addEventListener('click', () => this._handleCardClick());

  }

  removeCard() {
    this._cardDeleteBtn.closest('.element').remove();
  }

  _makeLike() {
    this._cardLikeBtn.classList.add('element__like-btn_active');
  }

  _breakLike() {
    this._cardLikeBtn.classList.remove('element__like-btn_active');
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {

    this._likes = newLikes;
    this._cardLikeCount.textContent = this._likes.length;


    if (this.isLiked()) {
      this._makeLike();
    } else {
      this._breakLike();
    }

  }

}
