import { counterPage } from '../index';
import Notiflix from 'notiflix';
import { butMoreVisibilOFF, butMoreVisibilON } from './activeAndVisible';
import { messageEndGallery } from './message';
import { perPage } from './getImage';
import { onPresetHTML } from '../index';

export default function scanTotalHits(resp) {
  console.log(`counterPage:${counterPage}`);
  console.log(`resp.totalHits:${resp.totalHits}`);

  if (resp.hits.length === 0) {
    throw new Error(error);
  }
  if (counterPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${resp.totalHits} images.`);
    butMoreVisibilON();
    onPresetHTML();
  }
  if (resp.totalHits - counterPage * `${perPage}` <= 0) {
    butMoreVisibilOFF();
    Notiflix.Notify.success(messageEndGallery());
  }
}
