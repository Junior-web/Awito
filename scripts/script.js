'use strict'

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];   //  это нужно запомнить, даже не нужно условий)!!!

const d = document,
      modalAdd = d.querySelector('.modal__add'),
      addAd = d.querySelector('.add__ad'),
      modalBtnSubmit = d.querySelector('.modal__btn-submit'),
      modalSubmit = d.querySelector('.modal__submit'),
      modalItem = d.querySelector('.modal__item'),
      catalog = d.querySelector('.catalog'),
      card = d.querySelector('.card'),
      modalBtnWarning = d.querySelector('.modal__btn-warning'),
      modalFileInput = d.querySelector('.modal__file-input'),
      modalFileBtn = d.querySelector('.modal__file-btn'),
      modalImageAdd = d.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent,
      srcModalImage = modalImageAdd.src;

//  формирование массива элементов формы
const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');   // спред-оператор???

//  сохранение в базу данных
const saveDB = () => {
    localStorage.setItem('awito', JSON.stringify(dataBase));
}

const infoPhoto = {};

//  проверка заполнения полей формы
const checkForm = () => {
    const validForm = elementsModalSubmit.every(elem => elem.value); // ??? почитать про every
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

//  закрытие модальных окон
const closeModal = (event) => {    // делегирование
    const target = event.target;

    if(target.closest('.modal__close') ||
        target.classList.contains('modal') || 
        event.code === 'Escape') {

        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        d.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        modalImageAdd.src = srcModalImage;
        modalFileBtn.textContent = textFileBtn;
        checkForm();
    }
}

const renderCard = () => {
    catalog.textContent = '';

    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
            <li class="card" data-id="${i}">
                <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem} ₽</div>
                </div>
            </li>            
        `);
    });
}

modalFileInput.addEventListener('change', event => {
    const target = event.target;

    const reader = new FileReader();

    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', (event) => {
        if(infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);  //  ??? base64 для email
            console.log(infoPhoto);
            modalImageAdd.src = `data:image/jpeg;base64, ${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = 'Файл большой!';
            modalFileInput.value = '';
            checkForm();
        }
    });
});

//  валидация форм
modalSubmit.addEventListener('input', checkForm);

//  сохранение данных формы
modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};

    for(const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }

    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    modalSubmit.reset();

    closeModal({target: modalAdd});
    saveDB();
    renderCard();
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
    const targetCard = target.closest('.card');

    if(targetCard) {
        modalItem.classList.remove('hide');
        d.addEventListener('keydown', closeModal);

        //  заполнение данными модального окна карточки товара
        const idCard = targetCard.getAttribute('data-id'),
              currentCard = dataBase[idCard];

        for(const item in currentCard) {
            const dataImage = d.querySelector(`[data-item=${item}]`);

            if(dataImage) {
                if(item === 'image') {
                    dataImage.src = `data:image/jpeg;base64, ${currentCard[item]}`;
                } else {
                    dataImage.textContent = currentCard[item];
                }                
            }
        }
    }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

renderCard();