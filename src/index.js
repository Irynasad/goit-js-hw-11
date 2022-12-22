import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const axios = require('axios').default;

const getItemTemplait = () => {
  `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
};
