import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import NewApiPixabay from './pictures.service';
import axios from 'axios';
// const axios = require('axios').default;
import NewApiPixabay from './pictures.service';

const newApiPixabay = new NewApiPixabay();

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// console.log(refs);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  console.log('форма слушает');
  newApiPixabay.value = e.currentTarget.elements.searchQuery.value;
  newApiPixabay.resetPage();
  console.log(newApiPixabay.value);
  newApiPixabay.fetchGallerry().then(data => {
    console.log(data);
    const gallery = data.hits;
    console.log(data.hits);
    return gallery;
  });
}

function onLoadMore(e) {
  e.preventDefault();
  console.log('клик на кнопке');
  newApiPixabay.fetchGallerry();
  newApiPixabay.incrementPage();
}

// const getItemTemplait = () => {
//   `<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`;
// };

// webformatURL,
// largeImageURL,
// tags,
// likes,
// views,
// comments,
// downloads,
