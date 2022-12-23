import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import axios from 'axios';
// const key = 32306530 - bed9e4ec976e510d33adb63ac;
// axios.defaults.baseURL = 'https://pixabay.com/api/';
const URL = 'https://pixabay.com/api/';

// const axios = require('axios').default;

function fetchImgs() {
  return axios
    .get(
      '$URL?key=32306530 - bed9e4ec976e510d33adb63ac&q=yellow+flowers&image_type=photo'
    )
    .then(console.log);
}
fetchImgs();

function onfetch() {
  fetch(
    '$URL?key=32306530 - bed9e4ec976e510d33adb63ac&q=yellow+flowers&image_type=photo'
  )
    .then(r => r.json())
    .then(console.log);
}
onfetch();

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
