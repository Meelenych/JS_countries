export default function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;languages;flag`,
  )
    .then(response => {
      if (response.ok) return response.json();
      return { countries: [] };
    })
    .catch(err => {
      throw new Error(err.message);
    });
}