'use strict'

const dataBase = [];

const d = document,
      modalAdd = d.querySelector('.modal__add'),
      addAd = d.querySelector('.add__ad'),
      modalBtnSubmit = d.querySelector('.modal__btn-submit'),
      modalSubmit = d.querySelector('.modal__submit'),
      modalItem = d.querySelector('.modal__item'),
      catalog = d.querySelector('.catalog'),
      modalBtnWarning = d.querySelector('.modal__btn-warning');

//  формирование массива элементов формы
const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');   // спред-оператор???

//  закрытие модальных окон
const closeModal = function(event) {    // делегирование
     const target = event.target;
    
    if(target.closest('.modal__close') ||
        target === this) {
        this.classList.add('hide');
        modalSubmit.reset();
        modalBtnWarning.style.display = 'block';
    } else if(event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        modalBtnWarning.style.display = 'block';
    } 
}

//  валидация форм
modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value); // ??? почитать про every
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

//  сохранение данных формы
modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};

    for(const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }

    dataBase.push(itemObj);
    modalSubmit.reset();

    //closeModal(event);
});

//  открытие модального окна добавления объявления
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    d.addEventListener('keydown', closeModal);
});

//  открытие модального окна карточки товара
catalog.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('.card')) {
        modalItem.classList.remove('hide');
        d.addEventListener('keydown', closeModal);
    }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
modalBtnSubmit.addEventListener('click', () => { modalAdd.classList.add('hide') });  //  ??? неправильно