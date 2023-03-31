import { counterPage } from '../index';
import Notiflix from 'notiflix';
import { butMoreVisibilOFF } from './activeAndVisible';
import { messageEndGallery, messageNullSearch } from './message';
import { perPage } from './getImage';

export default function scanTotalHits(resp) {
  if (resp.hits.length === 0) {
    Notiflix.Notify.failure(messageNullSearch());
    return;
  }
  if (counterPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${resp.totalHits} images.`);
  }
  if (resp.totalHits - counterPage * `${perPage}` <= 0) {
    butMoreVisibilOFF();
    Notiflix.Notify.success(messageEndGallery());
  }
}
