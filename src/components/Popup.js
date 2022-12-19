export class Popup {

  constructor(popupSelector) {

    this._popup = document.querySelector(popupSelector);  // принимаем в конструктор селектор попапа
    this._handleEscClose = this._handleEscClose.bind(this); // задали обработки и привязали контекст
  }

  open() {

    this._popup.classList.add('popup_opened'); // открываем попап
    document.addEventListener('keydown', this._handleEscClose); // навешиваем слушатель на кнопку Esc

  }

  close() {

    this._popup.classList.remove('popup_opened'); // закрываем попап
    document.removeEventListener('keydown', this._handleEscClose); // снимаем обработчик с кнопки Esc

  }

  _handleEscClose(event) {

    if (event.key === 'Escape') { // логика закрытия попапа клавишей Esc
      this.close(); // вызываем метод закрытия попапа
    }
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', (event) => {  // добавляем слушатель клика на overlay и на кнопку закрытия попапа
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
