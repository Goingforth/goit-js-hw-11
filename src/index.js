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
//refs.nextPage.style.display = 'none';

refs.form.addEventListener('submit', onFormSubmit);
refs.nextPage.addEventListener('click', onLoadMore);
refs.input.addEventListener('input', onPresetData);

let searchQuery = null;

function onFormSubmit(event) {
  event.preventDefault();
  //   if (counterPage === 1) {
  //     // refs.nextPage.style.display = 'visible';
  refs.nextPage.classList.remove('visibility__OFF');
  // }
  // counterPage += 1;
  const formData = new FormData(refs.form);
  searchQuery = formData.get('searchQuery').trim();
  searchQuery === ''
    ? Notiflix.Notify.warning(messagePleaseEnter())
    : getImage(searchQuery, counterPage);
}

function onLoadMore(event) {
  counterPage += 1;
  refs.buttonSubmit.setAttribute('disabled', 'disabled');
  console.log(counterPage);
  onFormSubmit(event);
  //getImage(searchQuery, counterPage);
}

//     event.currentTarget.reset();

function onPresetData(input) {
  if (refs.input.value.trim() !== searchQuery) {
    counterPage = 1;
    refs.nextPage.classList.add('visibility__OFF');
    refs.buttonSubmit.removeAttribute('disabled');
  }
}
