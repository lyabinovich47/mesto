import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmit) {

    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__container');

  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
  }

  setEventListeners() {

    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {

      event.preventDefault();
      this._handleSubmit(event);

    });

  }


}
