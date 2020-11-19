const form = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#country");
const p2 = document.querySelector("#new-confirmed");
const p3 = document.querySelector("#total-confirmed");

search.focus();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const countryInput = search.value;
  countryInput.toLowerCase();
  p1.textContent = "";
  p2.textContent = "";
  p3.textContent = "";

  let url = "https://api.covid19api.com/summary";

  fetch(url).then((response) => {
    response.json().then((data) => {
      const summary = data.Countries;

      const countryIndex = summary.findIndex(
        (country) => country.Country.toLowerCase() === countryInput
      );

      if (countryIndex === -1 || countryInput === "") {
        alert("Invalid search");
        search.value = "";
        p1.textContent = "";
        p2.textContent = "";
        p3.textContent = "";
      } else {
        search.value = "";
        p1.textContent = "Country: " + summary[countryIndex].Country;
        p2.textContent =
          "New confirmed cases: " + summary[countryIndex].NewConfirmed;
        p3.textContent =
          "Total confirmed cases: " + summary[countryIndex].TotalConfirmed;
      }
    });
    search.focus();
  });
});
