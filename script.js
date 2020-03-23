function allright() {
  navigator.geolocation.getCurrentPosition(showWeather);
}

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },

  "san francisco": {
    temp: 20.9,
    humidity: 100
  },

  moscow: {
    temp: -5,
    humidity: 20
  }
};

let arrayCities = false;
let enterCity = prompt("Enter city?");

let keys = Object.keys(weather);

for (let i = 0; i < keys.length; i++) {
  if (!(enterCity.toLowerCase().trim() === keys[i].trim())) {
    if (i === keys.length - 1) {
      arrayCities = true;
      weather[keys[i]].temp = Math.round;
    }
    continue;
  } else {
    let fahrenheit = Math.round(weather[keys[i]].temp * 1.8 + 32);
    alert(
      `It is currently ${weather[keys[i]].temp} ºC ( ${fahrenheit} F) in ${enterCity.trim()} with a humidity of ${weather[keys[i]].humidity}%`
    );
    break;
  }
}

if (arrayCities) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${enterCity.toLowerCase()}`
  );
}

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
  let url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
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
  if(navigator.geolocation) {
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

