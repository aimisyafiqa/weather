// Wait for the DOM to fully load before executing the JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // Retrieve weather data from localStorage and parse it into an object
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));

  // Check if weather data is available in localStorage
  if (weatherData) {
    // Display weather data in the relevant HTML elements
    document.getElementById("location").textContent = `${weatherData.cityName}, ${weatherData.country}`;
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
    // Alert the user if no weather data is available
    alert("No weather data available. Please go back and search for a city.");
  }
});
