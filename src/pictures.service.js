import axios from 'axios';

export default class NewApiPixabay {
  #BASE_URL = 'https://pixabay.com/api/';
  #KEY = '32306530-bed9e4ec976e510d33adb63ac';
  constructor() {
    this.valueForSearch = '';
    this.numberPage = 1;
    this.perPage = 40;
  }

  fetchGallerry() {
    // console.log(this);
    return axios
      .get(`${this.#BASE_URL}`, {
        params: {
          key: this.#KEY,
          q: this.valueForSearch,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: this.perPage,
          page: this.numberPage,
        },
      })
      .then(data => {
        return data.data;
      })
      .then(body => {
        this.incrementPage();
        return body.hits;
        console.log(body.hits);
      });
  }
  // передавання значення инпута в кoнcтруктор через місточок гет+сет.
  // визначаємо та перезаписуємо змінну значення

  get ValueForSearch() {
    return this.valueForSearch;
  }
  set ValueForSearch(value) {
    this.valueForSearch = value;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
