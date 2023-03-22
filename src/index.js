import './sass/main.scss';
// import './js/fetchCountries.js';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

//=================================================================================
const searchBox = document.getElementById('search_input');
const countryCard = document.getElementById('country_card');
//=================================================================================

function clearQuery() {
  countryCard.innerHTML = '';
}

searchBox.addEventListener(
  'input',
  debounce(e => {
    let searchQuery = e.target.value;

    fetch(
      `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,languages,cca2,continents,coatOfArms,area,currencies`,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`No matches found!`);
        }
      })
      .then(array => {
        if (array.length > 3) {
          Notiflix.Notify.failure('Too many matches found!');
          throw new Error(`Too many matches found!`);
        }
        return array;
      })
      .then(array => {
        console.log(array);
        let items = array
          .map(item => {
            const {
              cca2,
              name,
              capital,
              languages,
              population,
              continents,
              coatOfArms,
              area,
              currencies,
            } = item;
            if (array.length <= 10 && array.length >= 2) {
              Notiflix.Notify.warning('Please specify your request!');
              return `<ul>
                        <li> ${name}</li>
                      </ul>`;
            } else if (array.length === 1) {
              Notiflix.Notify.success('Success! Country found!');
              const newFlag = `https://flagcdn.com/${cca2.toLowerCase()}.svg`;
              return `<ul>
                        <li>
                          <img src=${newFlag} alt="flag" width=300>
                          <img src=${coatOfArms.svg} alt="coatOfArms" width=150>
                        </li>
                        <li><b>Country name:</b> ${name.official}</li>
                        <li><b>Capital:</b> ${capital}</li>
                        <li><b>Continent:</b> ${continents}</li>
                        <li><b>Languages:</b> ${Object.values(languages).map(language => ` ${language}`)}</li>
                        <li><b>Currencies:</b>${Object.values(currencies).map(currency => ` ${currency.name}`)}</li>
                        <li><b>Area:</b> ${area.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f')} sq. km</li>
                        <li><b>Population:</b> ${population.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f')} people</li>
                      </ul>`;
            }
          })
          .join('');
        countryCard.insertAdjacentHTML('afterbegin', items);
      })
      .catch(err => {
        console.log(err);
      });
    clearQuery();
  }),
  500,
);
