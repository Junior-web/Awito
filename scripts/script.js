'use strict'

const d = document,
      modalAdd = d.querySelector('.modal__add'),
      addAd = d.querySelector('.add__ad'),
      modalBtnSubmit = d.querySelector('.modal__btn-submit'),
      modalSubmit = d.querySelector('.modal__submit'),
      modalItem = d.querySelector('.modal__item'),
      catalog = d.querySelector('.catalog'),
      card = d.querySelector('.card');

const modalOpen = (modal) => {   // открытие модального окна
    modal.classList.remove('hide');
}

const modalClose = (modal) => {  // закрытие модального окна
    modal.classList.add('hide');
    modalSubmit.reset();
}

addAd.addEventListener('click', () => {
    modalOpen(modalAdd);
    modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', (event) => { // click
    const target = event.target;

    if(target.classList.contains('modal__close') ||
       target === modalAdd) {
        modalClose(modalAdd);
    }
});

d.addEventListener('keydown', (event) => {  // esc
    if(event.keyCode === 27) {
        modalClose(modalAdd);
        modalClose(modalItem);
    }
});

catalog.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('.card')) {
        modalOpen(modalItem);
    }
});

modalItem.addEventListener('click', (event) => { // click
    const target = event.target;

    if(target.classList.contains('modal__close') ||
       target === modalItem) {
        modalClose(modalItem);
    }
});