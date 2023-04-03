import Notiflix from 'notiflix';

import {
  messagePleaseEnter,
  messageNullSearch,
  messageEndGallery,
} from './js/message';

import getImage from './js/getImage';
import scanTotalHits from './js/scanTotalHits';
import markupGallery from './js/markupGallery';
import { newGallery } from './js/markupGallery';

import {
  butSubmitActiveOFF,
  butSubmitActiveON,
  butMoreVisibilOFF,
  butMoreVisibilON,
} from './js/activeAndVisible';

const refsForm = document.querySelector('.search-form');
const refsNextPage = document.querySelector('.load-more');
const refsInput = document.querySelector('input');
const refsButtonSubmit = document.querySelector("button[type = 'submit']");

export const gallery = document.querySelector('.gallery');

let counterPage = 1;

export { refsNextPage, refsButtonSubmit, counterPage };

butMoreVisibilOFF();

refsForm.addEventListener('submit', onFormSubmit);
refsNextPage.addEventListener('click', onLoadMore);
refsInput.addEventListener('input', onPresetData);

let searchQuery = null;
let oldSearchQuery = null;

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(refsForm);
  searchQuery = formData.get('searchQuery').trim();
  searchQuery === ''
    ? Notiflix.Notify.warning(messagePleaseEnter())
    : getImage(searchQuery, counterPage)
        .then(response => {
          scanTotalHits(response);
          butSubmitActiveOFF();
          return response;
        })
        .then(response => {
          markupGallery(response.hits);
        })
        .catch(error => {
          Notiflix.Notify.failure(messageNullSearch());
        });
}

function onLoadMore(event) {
  counterPage += 1;
  onFormSubmit(event);
}

function onPresetData(input) {
  if (refsInput.value.trim() !== searchQuery) {
    counterPage = 1;
    butMoreVisibilOFF();
    butSubmitActiveON();
  }
}
function clearHTML() {
  gallery.innerHTML = '';
  newGallery.innerHTML = '';
}

export function onPresetHTML() {
  if (oldSearchQuery !== searchQuery || counterPage === 1) {
    clearHTML(), (oldSearchQuery = searchQuery);
  }
}
