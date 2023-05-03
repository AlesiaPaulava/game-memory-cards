// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
import Card from './card.js';

const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal-message');
const closeBtn = document.querySelector('.modal-close');
let cardNumberArr = [];
let cardsArray = [];
let firstCard = null;
let secondCard = null;

//refreshBtn.addEventListener('click', resetGame);

function createNumbersArray(count) {
  for (let i = 1; i <= count; i++) {
    cardNumberArr.push(i);
    cardNumberArr.push(i);
  };
};
createNumbersArray(8);

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
function shuffle(arr) {
  cardNumberArr = cardNumberArr.sort(() => Math.random() - 0.5);
};
shuffle(cardNumberArr);

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(container) {

  for (const cardNumber of cardNumberArr) {
    cardsArray.push(new Card(container, cardNumber, flip));
  };

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {//если две карточки заполнены(открыты),то
      if(firstCard.number !== secondCard.number) {  //сравниваем их значения и они не совпаают
        firstCard.open = false //тогда закрываем карточки
        secondCard.open = false
        firstCard = null //сбрасываем firstCard чтобы алгоритм повторялся
        secondCard = null
      };
    };

    //заполняем карточки
    if (firstCard === null) {
      firstCard = card
      } else {
        if (secondCard === null) {
          secondCard = card
        };
     //здесь мы имеем две открвтые карточки после клика
    };

    if (firstCard !== null && secondCard !== null) {//если две карточки заполнены(открыты),то
      if (firstCard.number === secondCard.number) {  //сравниваем их значения и они совпали
        firstCard.success = true // то добавляется класс success и карточки станут зеленые
        secondCard.success = true
        firstCard = null //сбрасываем firstCard чтобы алгоритм повторялся
        secondCard = null
      };
    };

    // модальное окно
    function showModal(message) {

      modalMessage.textContent = message;
      modal.style.display = 'flex';

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetGame();
      });
    };

    //Условия победы
    if (document.querySelectorAll('.card.success').length === cardNumberArr.length) {
      showModal("Вы выйграли!");
    };

    //Сброс игры
    function resetGame() {
      cardNumberArr = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;
      container.innerHTML = '';
      createNumbersArray(8);
      shuffle(cardNumberArr);
      startGame(container);
    };
  };
};

startGame(document.getElementById('game'));

