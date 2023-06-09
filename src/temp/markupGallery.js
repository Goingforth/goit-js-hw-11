import { gallery } from '../index';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery a');

// export const newGallery = document.createElement('ul');
// newGallery.classList.add('galleryItems');

// export default function markupGallery(resp) {
//   resp.forEach(function (resp) {
//     const newItem = document.createElement('li');
//     newItem.classList.add('galleryItem');

//     newItem.innerHTML = `<div class="photo-card">
// <a  href="${resp.largeImageURL}">
//   <img src="${resp.webformatURL}" alt="${resp.tags}" loading="lazy"  />
// </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b> ${resp.likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${resp.views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${resp.comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${resp.downloads}
//     </p>
//   </div>
// </div>`;

//     newGallery.appendChild(newItem);
//   });

//   gallery.append(newGallery);

//   lightbox.refresh();

//   // const { height: cardHeight } =
//   //   // gallery.firstElementChild.getBoundingClientRect();
//   //   newGallery.lastElementChild.getBoundingClientRect();
//   // console.log(newGallery.lastElementChild.getBoundingClientRect());

//   // console.log(newGallery.lastElementChild);

//   // window.scrollBy({
//   //   top: cardHeight * 30,
//   //   behavior: 'smooth',
//   // });
// }
let galleryString = '';
//export let valGalleryString = () => galleryString;
//import galleryString from '../index';
export default function markupGallery(resp) {
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

  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
