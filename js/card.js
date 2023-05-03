// Создаем карты
export default class Card { //шаблон для создания карточек

  _open = false;
  _success = false;

  constructor (container, number, action) {
    this.card = document.createElement('div'); //создаем див
    this.card.classList.add('card'); //добаляем класс
    this.card.textContent = number; //текст карты
    this.number = number;

    this.card.addEventListener('click', () => { //стрелочкая функция, так как this должен быть родительский элемент
      if (this.open == false && this.success == false) { //если карточна закрыта(нет класса open) и нет класса success, то при клике
        this.open = true; //карточка открыта
        action(this); //колбэк функция
      }
    });

    container.append(this.card);//при вызове функции блок card добавляется в блок game
  }

  set open(value) { //устанавливаем функцию прежде, чем значение функции
    this._open = value; //меняет значение на false или true
    value ? this.card.classList.add('open') : this.card.classList.remove('open'); //если value, то добавляется класс open, иначе удаляется класс open
  };

  get open() { //получение значения функции
    return this._open
  };

  set success(value) { //устанавливаем функцию прежде, чем значение функции
    this._success = value; //меняет значение на false или true
    value ? this.card.classList.add('success') : this.card.classList.remove('success'); //если value, то добавляется класс success, иначе удаляется класс success
  };

  get success() { //получение значения функции
    return this._success
  };
};
