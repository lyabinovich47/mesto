import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  // конструктор не пишем, т.к. будем использовать конструктор родителя без изменений

  open(text, link) {

    const image = this._popup.querySelector('.popup__big-photo');
    const caption = this._popup.querySelector('.popup__big-photo-title');

    image.src = link;
    caption.textContent = text;


    super.open();
  }



}


