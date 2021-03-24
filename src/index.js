import getRefs from './js/refs.js'
import fetchCountry from './js/fetchCountries.js'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import './styles.css';
import countriesTpl from './templates/countriesTpl.hbs';
import oneCountryTpl from './templates/oneCountryTpl.hbs';
//pnotify
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

const refs = getRefs();
//lodash
const debounce = require('lodash.debounce');

function onCountrySearch({ target: { value } }) {
  fetchCountry(value)
    .then(response => {
      refs.container.innerHTML = '';

      if (response.length === 1) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          oneCountryTpl(response),
        );
      } else if (response.length >= 2 && response.length <= 10) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          countriesTpl(response),
        );
      } else if (response.length > 10) {
        error({
          text: 'Слишком много совпадений! Сделайте более специфичный запрос.',
          delay: 1500,
        });
      }
    })
    .catch(notFoundMessage);
}

// if not found
function notFoundMessage(){
  error({
    title: 'Error',
    delay: 1500,
    text: "Страна не найдена!",
    ...PNotifyMobile
  });
}

refs.searchInput.addEventListener('input', debounce(onCountrySearch, 500));