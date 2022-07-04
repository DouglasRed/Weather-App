var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var searches = [];

//get value from input element

var getWeather = function (cityName) {
  var apiKey = "821bf60e7a4a447f19613519e829ee2c";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
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

cityFormEl.addEventListener("submit", formSubmitHandler);
