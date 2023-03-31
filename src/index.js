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

const gallery = document.querySelector('.gallery');
let counterPage = 1;
export { refsNextPage, refsButtonSubmit, counterPage };

butMoreVisibilOFF();

refsForm.addEventListener('submit', onFormSubmit);
refsNextPage.addEventListener('click', onLoadMore);
refsInput.addEventListener('input', onPresetData);

const newGallery = document.createElement('ul');
newGallery.classList.add('galleryItems');

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
          scanTotalHits(response), markupGallery(response.hits);
        });
}

function onLoadMore(event) {
  counterPage += 1;
  onFormSubmit(event);
}

//     event.currentTarget.reset();

function onPresetData(input) {
  if (refsInput.value.trim() !== searchQuery) {
    counterPage = 1;
    butMoreVisibilOFF();
    butSubmitActiveON();
    // reset innerHtml
    gallery.innerHTML = '';
    newGallery.innerHTML = '';
  }
}

// largeImageURL - ссылка на большое изображение.

function markupGallery(resp) {
  //!!!!!!!! здесь вставить функцию формирования LI !!!!!!!!!!
  resp.forEach(function (resp) {
    const newItem = document.createElement('li');
    newItem.classList.add('galleryItem');

    newItem.innerHTML = `<div class="photo-card">
  <img src="${resp.webformatURL}" alt="resp.tags" loading="lazy"  />
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

    newGallery.appendChild(newItem);
  });

  gallery.append(newGallery);
}
