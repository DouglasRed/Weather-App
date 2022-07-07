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
  var statusIcon = document.createElement("img");
  statusIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  weatherSearchedCity.appendChild(statusIcon);
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

    // var statusIcon5 = document.createElement("img");
    // statusIcon.setAttribute(
    //   "src",
    //   `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    // );

    var tempCard = document.createElement("span");
    tempCard.textContent = "Temp: " + weather.main.temp + `\u00B0` + "F";
    weatherCardEl.appendChild(tempCard);
    // weatherCardEl.appendChild(statusIcon5);
    weatherForecast.appendChild(weatherCardEl);

    console.log(futureDay);

    console.log(weather, searchedCity);
  }
};

cityFormEl.addEventListener("submit", formSubmitHandler);
