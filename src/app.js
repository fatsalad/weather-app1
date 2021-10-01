// Show Current Day

function showCurrentDay() {
  let currentDay = document.querySelector("#day");
  let now = new Date();
  let days = [
    "Sunday,",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  currentDay.innerHTML = day;
}
showCurrentDay();

// Show Current Time

function showCurrentTime() {
  let currentTime = document.querySelector("#time");
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (now.getMinutes() < 10) {
    currentTime.innerHTML = hours + ":0" + minutes;
  } else {
    currentTime.innerHTML = hours + ":" + minutes;
  }
}
showCurrentTime();

// Find and Display Weather by City

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

let citySearchInput = document.querySelector("#city-search-input");
citySearchInput.addEventListener("submit", formSubmit);

function showWeather(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("h1");
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = `${temp}°F`;
  cityDisplay.innerHTML = `${city}`;
  console.log(response.data);
}

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
