import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import NewApiPixabay from './pictures.service';
import axios from 'axios';
// const axios = require('axios').default;
import NewApiPixabay from './pictures.service';

const newApiPixabay = new NewApiPixabay();
let pictures = [];

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
  newApiPixabay
    .fetchGallerry()
    .then(data => {
      return data.data;
    })
    .then(body => {
      pictures = body.hits;
      render(pictures);
    });
}

function onLoadMore(e) {
  e.preventDefault();
  console.log('клик на кнопке');
  newApiPixabay.fetchGallerry();
  newApiPixabay.incrementPage();
}

function render(pictures) {
  const gallery = pictures.map(pictures => {
    getItemTemplait(picture);
  });
  refs.container.innerHTML = '';
  refs.container.insertAdjacentHTML('beforeend', gallery);
}

function getItemTemplait({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="370" height="240" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
}

// webformatURL,
// largeImageURL,
// tags,
// likes,
// views,
// comments,
// downloads,
