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

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');   // спред-оператор???

const closeModal = function(event) {    // делегирование
    const target = event.target;

    if(target.closest('.modal__close') ||
       target === this) {
        this.classList.add('hide');
        modalSubmit.reset();
        d.removeEventListener('keydown', closeModalEsc);
    }
}

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value); // ???
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};

    for(const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }

    dataBase.push(itemObj);
    modalSubmit.reset();
    console.log(dataBase);
});

const closeModalEsc = function(event) {
    if(event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
    }
}

// дз объединить две функции

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    d.addEventListener('keydown', closeModalEsc);
});

catalog.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('.card')) {
        modalItem.classList.remove('hide');
        d.addEventListener('keydown', closeModalEsc);
    }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);