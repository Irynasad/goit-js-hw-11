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

async function onSearch(e) {
  e.preventDefault();
  console.log('форма слушает');
  clearGallery();
  newApiPixabay.value = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  newApiPixabay.resetPage();
  console.log(newApiPixabay.value);
  newApiPixabay
    .fetchGallerry()
    .then(data => {
      return data.data;
    })
    .then(body => {
      const newHits = body.hits;
      console.log(newHits);
      render(newHits);
    });
}

function render(newHits) {
  //   refs.container.innerHTML = '';
  refs.container.insertAdjacentHTML('beforeend', getItemTemplait(newHits));
}

function onLoadMore(e) {
  e.preventDefault();
  console.log('клик на кнопке');
  newApiPixabay.fetchGallerry();
  newApiPixabay.incrementPage();
}
function clearGallery() {
  refs.container.innerHTML = '';
}

function getItemTemplait(pictures = []) {
  return pictures
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
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
</div>`
    )
    .join('');
}

// webformatURL,
// largeImageURL,
// tags,
// likes,
// views,
// comments,
// downloads,
