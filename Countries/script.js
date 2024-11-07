const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region")
const searchInput = document.querySelector(".search-container input")
let allCountriesData;
const themeChanger = document.querySelector(".theme-changer")

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener('change', (e) => {
  const region = e.target.value;
  fetch(`https://restcountries.com/v3.1/region/${region}`)
  .then((res) => res.json())
  .then(renderCountries);
 })

function renderCountries(data) {
  countryContainer.innerHTML = ''
    data.forEach((country) => {
        // console.log(country);
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `./country.html?name=${country.name.common}`
      countryCard.innerHTML = `
      <img src=${country.flags.svg} alt=${country.name.common}>
      <div class="card-content">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population : </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region : </b>${country.region}</p>
          <p><b>Capital : </b>${country.capital?.[0]}</p>
      </div>`;
      countryContainer.append(countryCard);
    });
}

searchInput.addEventListener('input', (e)=> {
  console.log(e.target.value)
  const filter = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filter)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle("dark")
})