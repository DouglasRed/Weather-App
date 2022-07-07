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
var apiKey = "821bf60e7a4a447f19613519e829ee2c";

var searches = [];
//get value from input element

var getWeather = function (cityName) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl).then(function (response) {
    weatherForecast.textContent = "";
    weatherForecast.classList.add("hidden");
    if (response.ok) {
      response.json().then(function (data) {
        getAllData(data, cityName);
      });
    } else {
      weatherSearchedCity.textContent = "Error: City not found";
    }
  });
};

var getAllData = function (data, cityName) {
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
  // console.log(lat, lon);
  fetch(apiUrl2).then(function (response) {
    if (response.ok) {
      response.json().then(function (data2) {
        console.log(data2.daily[0]);

        displayWeather(data2, cityName);
      });
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

var reset = function () {
  weatherForecast.textContent = "";
  weatherTemp.textContent = "";
  weatherWind.textContent = "";
  weatherHumidity.textContent = "";
  weatherContainerEl.textContent = "";
  weatherContainerEl.classList.add(".hidden");
  weatherForecast.classList.add(".hidden");
};

var displayWeather = function (weather, searchedCity) {
  // weatherContainerEl.textContent = "";
  weatherContainerEl.classList.add("border");
  weatherSearchedCity.textContent = searchedCity + " (" + currentDate + ")";
  var statusIcon = document.createElement("img");
  statusIcon.setAttribute(
    `src`,
    `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
  );
  statusIcon.classList.add("main-icon");
  weatherSearchedCity.appendChild(statusIcon);
  weatherTemp.textContent = "Temp: " + weather.current.temp + `\u00B0` + "F";
  weatherWind.textContent = "Wind: " + weather.current.wind_speed + " MPH";
  weatherHumidity.textContent = "Humidity: " + weather.current.humidity + "%";

  weatherUV.textContent = "UV Index: " + weather.current.uvi;

  if (weather.current.uvi < 6) {
    weatherUV.classList.remove("high-UV");
    weatherUV.classList.remove("moderate-UV");
    weatherUV.classList.add("low-UV");
  } else if (weather.current.uvi >= 6 && weather.current.uvi < 8) {
    weatherUV.classList.remove("high-UV");
    weatherUV.classList.add("moderate-UV");
    weatherUV.classList.remove("low-UV");
  } else if (weather.current.uvi > 8) {
    weatherUV.classList.add("high-UV");
    weatherUV.classList.remove("moderate-UV");
    weatherUV.classList.remove("low-UV");
  }

  // weatherForecast.textContent = "";
  // weatherForecast.classList.add("hidden");
  document.querySelector(".subtitle-forecast").textContent = "5-Day Forecast:";
  weatherForecast.classList.add("width-100");
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
    weatherCardEl.classList.add("list-item", "col-2");

    var titleEl = document.createElement("span");
    titleEl.textContent = futureDay;

    weatherCardEl.appendChild(titleEl);

    var statusIcon5 = document.createElement("img");
    statusIcon5.setAttribute(
      `src`,
      `https://openweathermap.org/img/wn/${weather.daily[i].weather[0].icon}@2x.png`
    );
    weatherCardEl.appendChild(statusIcon5);
    var tempCard = document.createElement("span");
    tempCard.textContent =
      "Temp: " + weather.daily[i].temp.day + `\u00B0` + "F";
    weatherCardEl.appendChild(tempCard);

    var humidityCard = document.createElement("span");
    humidityCard.textContent = "Humidity: " + weather.daily[i].humidity;

    weatherCardEl.appendChild(humidityCard);
    weatherForecast.appendChild(weatherCardEl);

    console.log(futureDay);

    console.log(weather, searchedCity);
  }
};

cityFormEl.addEventListener("submit", formSubmitHandler);
