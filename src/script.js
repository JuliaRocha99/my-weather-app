function formatHours(timestamp) {
  let today = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let d = new Date(today);
  let dayName = days[d.getDay()];
  let h = today.getHours();
  let m = today.getMinutes();
  let min = ("0" + m).slice(-2);
  document.getElementById("date").innerHTML = `${dayName}, ${h}:${min}`;
  return `${h}:${min}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    dateObj = new Date(forecast.dt * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0");
    forecastElement.innerHTML += `<div class="col third">
            <h3>${timeString}</h3>
            <img class="icon2"
            src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            alt=""
            />
            <div class = "forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}º</strong>${Math.round(
      forecast.main.temp_min
    )}º
            </div>
          </div>`;
    console.log(forecast);
  }
}

function search(city) {
  let apiKey = "bf0050d8d22310df394fff19194582c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#searchCity");
  search(searchCityElement.value);
}

let fahrenheitTemperature = 0;

function displayFahrenheitTemperature() {
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

function displayCelsiusTemperature() {
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = parseFloat(temperatureElement.innerText);
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
if (form) {
  form.addEventListener("submit", handleSubmit);
}

search("Porto");
