import { gallery } from '../index';

export default function scrollGallery(counter) {
  if (counter >= 2) {
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      //top: cardHeight * 2 - 60,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
