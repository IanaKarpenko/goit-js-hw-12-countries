const BASIC_URL_ADDR = 'https://restcountries.eu/rest/v2';

export default function fetchCountry(country) {
    return fetch(`${BASIC_URL_ADDR}/name/${country}`).then(response => {
        if(response.status !== 404){
        return response.json();
      }
    });
  }
