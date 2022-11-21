function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = `${day} ${hours}:${minutes}`;
  return date;
}
let p = document.querySelector("#date-time");
p.innerHTML = formatDate();

//function searchCity(event) {
// event.preventDefault();
//  let input = document.querySelector("#city-search");
//  let currentCity = document.querySelector("#current-city");
// currentCity.innerHTML = `${input.value}`;
//}
//let Form = document.querySelector("#search-form");
//Form.addEventListener("submit", searchCity);
//let button = document.querySelector("#button-addon2");
//button.addEventListener("click", searchCity);

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${input.value}`;
  let apiKey = "6a24cc77d4ff78bf93b45ec8663047c7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${input.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

let button = document.querySelector("#button-addon2");
button.addEventListener("click", search);

//function degreesCelsius(event) {
//  let temperature = document.querySelector("#temperature");
//  temperature.innerHTML = "33º";
//}
//function degreesFahrenheit(event) {
// let temperature = document.querySelector("#temperature");
//  temperature.innerHTML = "92º";
//}
//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", degreesCelsius);
//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", degreesFahrenheit);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}°`;
  h2.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "6a24cc77d4ff78bf93b45ec8663047c7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCurrentWeatherLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonCurrent = document.querySelector("#button-addon3");
buttonCurrent.addEventListener("click", showCurrentWeatherLocation);

navigator.geolocation.getCurrentPosition(retrievePosition);
