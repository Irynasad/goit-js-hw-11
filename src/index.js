import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import NewApiPixabay from './pictures.service';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewApiPixabay from './pictures.service';

const newApiPixabay = new NewApiPixabay();

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');
// let hits = [];
let totalHits = 0;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  newApiPixabay.valueForSearch = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (!newApiPixabay.valueForSearch) {
    return;
  }
  newApiPixabay.resetPage();
  clearGallery();
  refs.loadMoreBtn.classList.add('is-hidden');

  await newApiPixabay
    .fetchGallerry()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        clearGallery();
        render(hits);
        lightbox.refresh();
        showLoadMoreBtn(hits, totalHits);
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

function showLoadMoreBtn(hits, totalHits) {
  if (
    hits.length === totalHits ||
    newApiPixabay.incrementPage() ===
      Math.ceil(totalHits / newApiPixabay.perPage)
  ) {
    refs.loadMoreBtn.classList.add('is-hidden');
  } else {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function render(hits) {
  refs.container.insertAdjacentHTML('beforeend', getItemTemplait(hits));
}

function onLoadMore(hits, totalHits) {
  // showLoadMoreBtn(hits, totalHits);
  newApiPixabay.incrementPage();
  // showLoadMoreBtn(hits, totalHits);

  newApiPixabay.fetchGallerry().then(({ hits }) => {
    render(hits);
  });
  showLoadMoreBtn(hits, totalHits);
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
