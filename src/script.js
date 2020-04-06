function displayTemperature(response) {
  console.log(temperature);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
}
let apiKey = "bf0050d8d22310df394fff19194582c3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//   $.getJSON(
//     `http://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=bf0050d8d22310df394fff19194582c3&units=metric`;
//     function (data) {
//       city.innerHTML = searchCity;
//       celsiusTemperature.innerHTML = Math.round(response.data.main.temp);
//       outputFahrenheit.innerHTML = Math.round(
//         convertToF(convertKelvinToCelsius(data.main.temp))
//       );
//     }
//   );
// }

// function showForecast(position) {
//   let city = document.querySelector("#city");
//   let apikey = "bf0050d8d22310df394fff19194582c3";
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
//   $.get(
//     "http://ipinfo.io",
//     function (response) {
//       city.innerHTML = response.city;
//     },
//     "jsonp"
//   );
//   $.getJSON(url, function (data) {
//     let celsiusTemperature = document.querySelector("#celsius-temperature");
//     let outputFahrenheit = document.querySelector("#outputFahrenheit");
//     celsiusTemperature.innerHTML = Math.round(
//       convertKelvinToCelsius(data.main.temp)
//     );
//     outputFahrenheit.innerHTML = Math.round(
//       convertToF(convertKelvinToCelsius(data.main.temp))
//     );
//   });
// }

// function currentLocation() {
//   if (navigator.geolocation) {
// //     navigator.geolocation.getCurrentPosition(showWeather);
// //   } else {
// //     alert("Geolocation not supported in this browser");
// //   }
// }
