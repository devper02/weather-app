// api key
const apiKey = "f0a0777a9b5943cca341397c8e76a9bf";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
// api key/
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

document.addEventListener("DOMContentLoaded", hideError);
document.addEventListener("DOMContentLoaded", () => {
  searchInput.focus();
});

// function for checkWeather
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  hideError();
  if (city === "") {
    showErrorWithAnimation();
    weather.style.display = "none";
    return;
  }
  if (response.status == 404) {
    showErrorWithAnimation();
    weather.style.display = "none";
    return;
  }
  const data = await response.json();
  console.log(data, "data");

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "&#8451";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  if (data.weather[0].main == "Clear") {
    weatherIcon.className = "fa-solid fa-sun";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.className = "fa-solid fa-cloud-rain";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.className = "fa-solid fa-cloud-mist";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.className = "fa-solid fa-cloud-drizzle";
  }
  weather.style.display = "block";
  error.style.display = "none";
}
// function for checkWeather/

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});
searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

// functions for blinking error
function showErrorWithAnimation() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}
// functions for blinking error/
