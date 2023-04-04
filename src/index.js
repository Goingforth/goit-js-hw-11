import Notiflix from 'notiflix';

import { messagePleaseEnter, messageNullSearch } from './js/message';

import getImage from './js/getImage';
import scanTotalHits from './js/scanTotalHits';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery a');

import {
  butSubmitActiveOFF,
  butSubmitActiveON,
  butMoreVisibilOFF,
} from './js/activeAndVisible';

const refsForm = document.querySelector('.search-form');
const refsNextPage = document.querySelector('.load-more');
const refsInput = document.querySelector('input');
const refsButtonSubmit = document.querySelector("button[type = 'submit']");

const gallery = document.querySelector('.gallery');

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
  galleryString = '';
}

export function onPresetHTML() {
  if (oldSearchQuery !== searchQuery || counterPage === 1) {
    clearHTML(), (oldSearchQuery = searchQuery);
  }
}

/////////////////////////////////////////////////////////////////

let galleryString = '';

function markupGallery(resp) {
  resp.forEach(function (resp) {
    galleryString =
      galleryString +
      `<div class="photo-card">
<a  href="${resp.largeImageURL}">
  <img src="${resp.webformatURL}" alt="${resp.tags}" loading="lazy"  />
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${resp.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${resp.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${resp.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${resp.downloads}
    </p>
  </div>
</div>`;
  });

  gallery.innerHTML = galleryString;

  lightbox.refresh();

  //   const { height: cardHeight } =
  //     gallery.firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: 'smooth',
  //   });
}
