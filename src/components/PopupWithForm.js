import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {

    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = [...this._form.querySelectorAll('.popup__text')]; // обходим все инпуты формы и формируем массив

  }

  _getInputValues() {

    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value; // формируем объект значений инпутов формы
    });

    return values;

  }

  setEventListeners() {

    super.setEventListeners();
    this._form.addEventListener('submit', (event) => { this._handleSubmit(event, this._getInputValues()) });

  }

  close() {

    super.close();
    this._form.reset();

  }

}
