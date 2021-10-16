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

// Format time for sunrise and sunset using timestamp
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Format Day for Forecast using timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return day;
}

//Find and display forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastDisplay = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `  <div class="col">
          <div class="card" style="width: 5rem">
            <div class="card-body">
              <h5 class="day-of-week">${formatDay(forecastDay.dt)}</h5>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].description
                }@2x.png"
                
                class="forecast-image"
              />
              <p class="forecast-temp-high">H: ${Math.round(
                forecastDay.temp.max
              )}°</p>
              <p class="forecast-temp-low">L: ${Math.round(
                forecastDay.temp.min
              )}°</p>
            </div>
          </div>
          </div>`;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastDisplay.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "5f97d4820c3fc75300e58d6ea5ec0f04";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=imperial`;

  axios.get(url).then(displayForecast);
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
  let tempDisplayHigh = document.querySelector("#temp-max");
  let tempDisplayLow = document.querySelector("#temp-min");
  let dateDisplay = document.querySelector("#date");
  let humidityDisplay = document.querySelector("#humidity");
  let windSpeedDisplay = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#weather-description");
  let iconDisplay = document.querySelector("#icon");
  let sunriseDisplay = document.querySelector("#sunrise");
  let sunsetDisplay = document.querySelector("#sunset");

  fahrenheitTemp = Math.round(response.data.main.temp);
  fahrenheitTempHigh = Math.round(response.data.main.temp_max);
  fahrenheitTempLow = Math.round(response.data.main.temp_min);

  tempDisplay.innerHTML = `${temp}`;
  cityDisplay.innerHTML = `${city}`;
  dateDisplay.innerHTML = formatDate(response.data);
  tempDisplayHigh.innerHTML = `High: ${fahrenheitTempHigh}°`;
  tempDisplayLow.innerHTML = `Low: ${fahrenheitTempLow}°`;

  humidityDisplay.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windSpeedDisplay.innerHTML =
    "Wind Speed: " + Math.round(response.data.wind.speed) + " m/hr";
  weatherDescription.innerHTML = response.data.weather[0].description;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  sunriseDisplay.innerHTML =
    "Sunrise: " + formatTime(response.data.sys.sunrise * 1000);
  sunsetDisplay.innerHTML =
    "Sunset: " + formatTime(response.data.sys.sunset * 1000);

  getForecast(response.data.coord);
}
let citySearchInput = document.querySelector("#city-search-input");
citySearchInput.addEventListener("submit", formSubmit);

//Convert temp units

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let celsiusTempHigh = ((fahrenheitTempHigh - 32) * 5) / 9;
  let celsiusTempLow = ((fahrenheitTempLow - 32) * 5) / 9;
  let celsiusTempDisplay = document.querySelector("#temp-display");
  let celsiusTempDisplayHigh = document.querySelector("#temp-max");
  let celsiusTempDisplayLow = document.querySelector("#temp-min");
  celsiusTempDisplay.innerHTML = Math.round(celsiusTemp);
  celsiusTempDisplayHigh.innerHTML =
    "High: " + Math.round(celsiusTempHigh) + "°";
  celsiusTempDisplayLow.innerHTML = "Low: " + Math.round(celsiusTempLow) + "°";
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTempDisplay = document.querySelector("#temp-display");
  let fahrenheitTempDisplayHigh = document.querySelector("#temp-max");
  let fahrenheitTempDisplayLow = document.querySelector("#temp-min");
  fahrenheitTempDisplay.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitTempDisplayHigh.innerHTML =
    "High: " + Math.round(fahrenheitTempHigh) + "°";
  fahrenheitTempDisplayLow.innerHTML =
    "Low: " + Math.round(fahrenheitTempLow) + "°";
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitTemp = null;
let fahrenheitTempHigh = null;
let fahrenheitTempLow = null;

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

searchCity("Los Angeles");
