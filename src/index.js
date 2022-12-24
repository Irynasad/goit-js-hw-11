import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import axios from 'axios';
// const axios = require('axios').default;
import NewApiPixabay from './pictures.service';

const NewApiPixabay = new NewApiPixabay();

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
console.log(refs);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  console.log('форма слушает');
  NewApiPixabay.value = e.currentTarget.elements.searchQuery.value;
  console.log(NewApiPixabay.value);
  NewApiPixabay.fetchGallerry();
}

function onLoadMore(e) {
  e.preventDefault();
  console.log('клик на кнопке');
  NewApiPixabay.fetchGallerry();
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
