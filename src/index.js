import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import NewApiPixabay from './pictures.service';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import LoadMoreBtn from './load-more-btn';
// import axios from 'axios';
// const axios = require('axios').default;
import NewApiPixabay from './pictures.service';

const newApiPixabay = new NewApiPixabay();
// const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });
// console.log(loadMoreBtn);

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// console.log(refs);

refs.loadMoreBtn.classList.add('is-hidden');

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  console.log('форма слушает');
  clearGallery();
  newApiPixabay.valueForSearch = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  console.log(newApiPixabay.valueForSearch);

  // newApiPixabay.resetPage();
  // clearGallery();

  if (!newApiPixabay.valueForSearch) {
    return;
  }
  newApiPixabay.resetPage();
  clearGallery();

  // await fetchGallerry();

  await newApiPixabay
    .fetchGallerry()
    .then(hits => {
      console.log(hits);

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        // console.log(data.totalHits); не працює - бо це поверхом вище.
        // Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        Notiflix.Notify.success(`Hooray! We found ДУЖЕ БАГАЦЬКО images.`);
        clearGallery();
        render(hits);
        lightbox.refresh();
        showLoadMoreBtn(hits);
        // refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

const lightbox = new simpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionPosition: 'top',
  captionDelay: 250,
  widthRatio: 0.8,
  heightRatio: 0.8,
});

function showLoadMoreBtn(hits) {
  if (hits.length >= 40) {
    return refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    return;
  }
  // if (hits.length <= 40) {
  //   return;
  // } else {
  //   refs.loadMoreBtn.classList.remove('is-hidden');
  // }
}

async function fetchGallerry() {
  await newApiPixabay.fetchGallerry().then((hits, totalHits) => {
    render(hits);
    return totalHits;
  });
}
function render(hits) {
  refs.container.insertAdjacentHTML('beforeend', getItemTemplait(hits));
}

function onLoadMore() {
  newApiPixabay.fetchGallerry().then(render);
}

function clearGallery() {
  refs.container.innerHTML = '';
}

function getItemTemplait(pictures = []) {
  return pictures
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class "gallery-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="370" height="240" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}
