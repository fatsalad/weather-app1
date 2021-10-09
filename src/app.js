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
  let humidityDisplay = document.querySelector("#humidity");
  let windSpeedDisplay = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#weather-description");
  let iconDisplay = document.querySelector("#icon");

  fahrenheitTemp = Math.round(response.data.main.temp);

  tempDisplay.innerHTML = `${temp}`;
  cityDisplay.innerHTML = `${city}`;
  dateDisplay.innerHTML = formatDate(response.data);
  humidityDisplay.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windSpeedDisplay.innerHTML =
    "Wind Speed: " + Math.round(response.data.wind.speed) + " km/hr";
  weatherDescription.innerHTML = response.data.weather[0].description;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  console.log(response.data);
}
let citySearchInput = document.querySelector("#city-search-input");
citySearchInput.addEventListener("submit", formSubmit);

//Convert temp units

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let celsiusTempDisplay = document.querySelector("#temp-display");
  celsiusTempDisplay.innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTempDisplay = document.querySelector("#temp-display");
  fahrenheitTempDisplay.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

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
