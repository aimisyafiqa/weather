document.addEventListener("DOMContentLoaded", function () {
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));

  if (weatherData) {
    document.getElementById("location").textContent = `${weatherData.cityName},  ${weatherData.country}`;
    document.getElementById("localTime").textContent = weatherData.localTime;
    document.getElementById("currentTemp").textContent = weatherData.currentTemp;
    document.getElementById("forecastTemp").textContent = weatherData.forecastTemp;
    document.getElementById("weatherIcon").src = weatherData.iconUrl;
    document.getElementById("windSpeed").textContent = weatherData.windSpeed;
    document.getElementById("humidity").textContent = weatherData.humidity;
    document.getElementById("chanceRain").textContent = weatherData.chanceRain;
    document.getElementById("pressure").textContent = weatherData.pressure;
    document.getElementById("condition").textContent = weatherData.condition;
  } else {
    alert("No weather data available. Please go back and search for a city.");
  }
});
