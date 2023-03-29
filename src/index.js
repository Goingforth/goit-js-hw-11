import Notiflix from 'notiflix';
import { messagePleaseEnter } from './js/message';

import getImage from './js/getImage';

let counterPage = 1;

const refs = {
  form: document.querySelector('.search-form'),
  nextPage: document.querySelector('.load-more'),
  input: document.querySelector('input'),
  buttonSubmit: document.querySelector("[type = 'submit']"),
};

refs.nextPage.classList.add('visibility__OFF');

refs.form.addEventListener('submit', onFormSubmit);
refs.nextPage.addEventListener('click', onLoadMore);
refs.input.addEventListener('input', onPresetData);

let searchQuery = null;

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(refs.form);
  searchQuery = formData.get('searchQuery').trim();
  searchQuery === ''
    ? Notiflix.Notify.warning(messagePleaseEnter())
    : getImage(searchQuery, counterPage)
        .then(buttonActiveOFF())
        .then(visibility__ON());
}

function onLoadMore(event) {
  counterPage += 1;
  console.log(counterPage);
  onFormSubmit(event);
}

//     event.currentTarget.reset();

function onPresetData(input) {
  if (refs.input.value.trim() !== searchQuery) {
    counterPage = 1;
    visibility__OFF();

    buttonActiveON();
  }
}

function buttonActiveOFF() {
  refs.buttonSubmit.setAttribute('disabled', 'disabled');
}

function buttonActiveON() {
  refs.buttonSubmit.removeAttribute('disabled');
}

function visibility__OFF() {
  refs.nextPage.classList.add('visibility__OFF');
}

function visibility__ON() {
  refs.nextPage.classList.remove('visibility__OFF');
}
