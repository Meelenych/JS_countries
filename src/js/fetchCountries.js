export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
    .then(response => {
      if (response.ok) return response.json();
      return { countries: [] };
    })
    .catch(err => {
      throw new Error(err.message);
    });
}
