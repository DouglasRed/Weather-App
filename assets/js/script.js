var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchedCity = document.querySelector("#weather-searched-city");
var weatherForecast = document.querySelector("#forecast-container");
var date = new Date();
var currentDate =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
var weatherTemp = document.querySelector("#weather-temp");
var weatherWind = document.querySelector("#weather-wind");
var weatherHumidity = document.querySelector("#weather-humidity");
var weatherUV = document.querySelector("#weather-uv");

var searches = [];
//get value from input element

var getWeather = function (cityName) {
  var apiKey = "821bf60e7a4a447f19613519e829ee2c";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data, city);
      });
    } else {
      weatherSearchedCity.textContent = "Error: City not found";
    }
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeather(cityName);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var displayWeather = function (weather, searchedCity) {
  // weatherContainerEl.textContent = "";
  weatherContainerEl.classList = "border";
  weatherSearchedCity.textContent = weather.name + " (" + currentDate + ")";
  weatherTemp.textContent = "Temp: " + weather.main.temp + `\u00B0` + "F";
  weatherWind.textContent = "Wind: " + weather.wind.speed + " MPH";
  weatherHumidity.textContent = "Humidity: " + weather.main.humidity + "%";
  weatherForecast.textContent = "5-Day Forecast:";
  // weatherUV.textContent = "" + weather.name;
  if (weather.length === 0) {
    weatherContainerEl.textContent = "City not found";
    return;
  }

  for (var i = 0; i < 5; i++) {
    var futureDay =
      date.getMonth() +
      1 +
      "/" +
      (date.getDate() + parseInt([i]) + 1) +
      "/" +
      date.getFullYear();

    var weatherCardEl = document.createElement("div");
    weatherCardEl.classList = "list-item col-2";

    var titleEl = document.createElement("span");
    titleEl.textContent = futureDay;

    weatherCardEl.appendChild(titleEl);

    var statusEl = document.createElement("span");
    statusEl.classList = "list-item";

    // if (weather.main === "Clouds") {
    //   statusEl.innerHTML = "☁️";
    // } else if (weather[i].main === "Thunderstorm") {
    //   statusEl.innerHTML = "⛈️";
    // } else if (weather[i].main === "Drizzle") {
    //   statusEl.innerHTML = "🌧️";
    // } else if (weather[i].main === "Rain") {
    //   statusEl.innerHTML = "🌦️";
    // } else if (weather[i].main === "Snow") {
    //   statusEl.innerHTML = "❄️";
    // } else if (
    //   weather[i].main === "Mist" ||
    //   "Smoke" ||
    //   "Haze" ||
    //   "Dust" ||
    //   "Fog" ||
    //   "Sand" ||
    //   "Ash" ||
    //   "squall" ||
    //   "Tornado"
    // ) {
    //   statusEl.innerHTML = "🌫️";
    // } else if (weather[i].main === "Clear") {
    //   statusEl.innerHTML = "☀️";
    // } else {
    //   statusEl.innerHTML = "Image unavailable";
    // }

    weatherCardEl.appendChild(statusEl);
    weatherForecast.appendChild(weatherCardEl);

    console.log(futureDay);

    console.log(weather, searchedCity);
  }
};

cityFormEl.addEventListener("submit", formSubmitHandler);
