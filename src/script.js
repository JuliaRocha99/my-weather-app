function showForecast() {
  let searchCity = document.getElementById("searchCity").value.trim();
  let city = document.querySelector("#city");
  let celsiusTemperature = document.querySelector("#celsius-temperature");
  let outputFahrenheit = document.querySelector("#outputFahrenheit");
  $.getJSON(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=bf0050d8d22310df394fff19194582c3`,
    function(date) {
      city.innerHTML = searchCity;
      celsiusTemperature.innerHTML = Math.round(
        convertKelvinToCelsius(date.main.temp)
      );
      outputFahrenheit.innerHTML = Math.round(
        convertToF(convertKelvinToCelsius(date.main.temp))
      );
    }
  );
}

function showWeather(position) {
  let city = document.querySelector("#city");
  let apikey = "bf0050d8d22310df394fff19194582c3";
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
  $.get(
    "http://ipinfo.io",
    function(response) {
      city.innerHTML = response.city;
    },
    "jsonp"
  );
  $.getJSON(url, function(data) {
    let celsiusTemperature = document.querySelector("#celsius-temperature");
    let outputFahrenheit = document.querySelector("#outputFahrenheit");
    celsiusTemperature.innerHTML = Math.round(
      convertKelvinToCelsius(data.main.temp)
    );
    outputFahrenheit.innerHTML = Math.round(
      convertToF(convertKelvinToCelsius(data.main.temp))
    );
  });
}

function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather);
  } else {
    alert("Geolocation not supported in this browser");
  }
}

function convertKelvinToCelsius(kelvin) {
  if (kelvin < 0) {
    return "below absolute zero (0 K)";
  } else {
    return kelvin - 273.15;
  }
}

function convertToF(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}

function fahrenheitConverter() {
  let celsius_temperature = document.getElementById("celsius-temperature")
    .innerHTML;
  celsius_temperature = parseFloat(celsius_temperature);
  document.getElementById("outputFahrenheit").innerHTML =
    celsius_temperature * 1.8 + 32;
}

function celsiusConverter() {
  let celsius_temperature = document.getElementById("celsius-temperature")
    .innerHTML;
  document.getElementById("outputFahrenheit").innerHTML = celsius_temperature;
  document.getElementById("FahrneihtSymbol").innerHTML = "C";
}
