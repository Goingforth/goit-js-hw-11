import { refsButtonSubmit, refsNextPage } from '../index';

export const butSubmitActiveOFF = () => {
  refsButtonSubmit.setAttribute('disabled', 'disabled');
};

export const butSubmitActiveON = () => {
  refsButtonSubmit.removeAttribute('disabled');
};

export const butMoreVisibilOFF = () => {
  refsNextPage.classList.add('visibility__OFF');
  refsNextPage.classList.remove('load-more');
};

export const butMoreVisibilON = () => {
  refsNextPage.classList.remove('visibility__OFF');
  refsNextPage.classList.add('load-more');
};
