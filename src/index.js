import Notiflix from 'notiflix';
import { messagePleaseEnter } from './js/message';

const refs = {
  form: document.querySelector('.search-form'),
};
const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(refs.form); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные
  const searchQuery = formData.get('searchQuery').trim();
  searchQuery === ''
    ? Notiflix.Notify.warning(messagePleaseEnter())
    : console.log(searchQuery);
}

//     event.currentTarget.reset();

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
