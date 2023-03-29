import Notiflix from 'notiflix';
import { messagePleaseEnter, messageEndGallery } from './js/message';

import getImage from './js/getImage';
import scanTotalHits from './js/scanTotalHits';

import {
  butSubmitActiveOFF,
  butSubmitActiveON,
  butMoreVisibilOFF,
  butMoreVisibilON,
} from './js/activeAndVisible';

const refsForm = document.querySelector('.search-form');
const refsNextPage = document.querySelector('.load-more');
const refsInput = document.querySelector('input');
const refsButtonSubmit = document.querySelector("[type = 'submit']");
let counterPage = 1;
export { refsNextPage, refsButtonSubmit, counterPage };

butMoreVisibilOFF();

refsForm.addEventListener('submit', onFormSubmit);
refsNextPage.addEventListener('click', onLoadMore);
refsInput.addEventListener('input', onPresetData);

let searchQuery = null;

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(refsForm);
  searchQuery = formData.get('searchQuery').trim();
  searchQuery === ''
    ? Notiflix.Notify.warning(messagePleaseEnter())
    : getImage(searchQuery, counterPage)
        .then(butSubmitActiveOFF(), butMoreVisibilON())
        .then(response => {
          scanTotalHits(response);
          // print(response);
        });
}

function onLoadMore(event) {
  counterPage += 1;
  console.log(counterPage);
  onFormSubmit(event);
}

//     event.currentTarget.reset();

function onPresetData(input) {
  if (refsInput.value.trim() !== searchQuery) {
    counterPage = 1;
    butMoreVisibilOFF();
    butSubmitActiveON();
  }
}

function print(resp) {
  console.log(resp);
}
