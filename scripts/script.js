'use strict'

const d = document,
      modalAdd = d.querySelector('.modal__add'),
      addAd = d.querySelector('.add__ad'),
      modalBtnSubmit = d.querySelector('.modal__btn-submit'),
      modalSubmit = d.querySelector('.modal__submit'),
      modalItem = d.querySelector('.modal__item'),
      card = d.querySelector('.card');

const modalOpen = (modal) => {   // открытие модального окна
    modal.classList.remove('hide');
}

const modalClose = () => {  // закрытие модального окна
    modalAdd.classList.add('hide');
    modalSubmit.reset();    // ???
}

addAd.addEventListener('click', () => {
    modalOpen(modalAdd);
    modalBtnSubmit.disabled = true;
});


modalAdd.addEventListener('click', (event) => { // click
    const target = event.target;

    if(target.classList.contains('modal__close') ||
       target === modalAdd) {
        modalClose();
    }
});

d.addEventListener('keydown', (event) => {  // esc
    if(event.keyCode === 27) {
        modalClose();
    }
});

d.addEventListener('click', (event) => {    // открытие модального окна товара
    const target = event.target;

    if(target.closest('.card')) {
        modalOpen(modalItem);
    }
});
