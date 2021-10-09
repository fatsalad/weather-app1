// Format Date
function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Find and Display Weather, Day, Time by City

function searchCity(city) {
  let key = "5f97d4820c3fc75300e58d6ea5ec0f04";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  axios.get(url).then(showWeather);
}

function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("h1");
  let tempDisplay = document.querySelector("#temp-display");
  let dateDisplay = document.querySelector("#date");
  tempDisplay.innerHTML = `${temp}°F`;
  cityDisplay.innerHTML = `${city}`;
  dateDisplay.innerHTML = formatDate(response.data);

  console.log(response.data);
}
let citySearchInput = document.querySelector("#city-search-input");
citySearchInput.addEventListener("submit", formSubmit);

// Find Weather by Location
function usePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "5f97d4820c3fc75300e58d6ea5ec0f04";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  axios.get(url).then(showWeather);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(usePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", findPosition);
