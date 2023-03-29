import { counterPage } from '../index';
import Notiflix from 'notiflix';
import { butMoreVisibilOFF } from './activeAndVisible';
import { messageEndGallery, messageNullSearch } from './message';
import { perPage } from './getImage';

export default function scanTotalHits(resp) {
  const totalHits = resp.totalHits;
  if (totalHits === 0) {
    Notiflix.Notify.failure(messageNullSearch());
  } else if (counterPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  } else if (totalHits - counterPage * `${perPage}` <= 0) {
    butMoreVisibilOFF();
    Notiflix.Notify.success(messageEndGallery());
  }
}
