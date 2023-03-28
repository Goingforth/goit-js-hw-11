import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default async function getImage(searchQuery, counterPage) {
  const options = {
    key: '34756753-b2a76777b50bc049ab8c28d3e',
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${counterPage}`,
    per_page: 40,
  };
  try {
    const response = await axios.get(`${BASE_URL}`, { params: options });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
