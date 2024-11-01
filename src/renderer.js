// Wait for the DOM to load before executing JavaScript
document.addEventListener("DOMContentLoaded", () => {
  
  // Select the form and input elements from the DOM
  const form = document.querySelector("form");
  const valueSearch = document.getElementById("name");
  
  // Select elements where weather information will be displayed
  const city = document.querySelector(".name figcaption");
  const countryFlag = document.querySelector(".name img");
  const tempDisplay = document.querySelector(".temperature figcaption span");
  const tempIcon = document.querySelector(".temperature img");
  const description = document.querySelector(".description");
  const clouds = document.getElementById("clouds");
  const humidity = document.getElementById("humidity");
  const pressure = document.getElementById("pressure");

  // Define the OpenWeatherMap API key and base URL
  const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

  // Event listener for the form submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (valueSearch.value !== '') { // Check if input field is not empty
      searchWeather(valueSearch.value); // Call searchWeather function with city name
    }
  });

  // Function to search and fetch weather data for a given city
  const searchWeather = async (cityName) => {
    try {
      const response = await fetch(`${apiURL}&q=${cityName}`); // Fetch data from API
      const data = await response.json(); // Parse response as JSON

      // Check if city is found (API response code 200)
      if (data.cod === 200) {
        // Update DOM elements with fetched weather data
        city.innerText = data.name;
        countryFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        tempDisplay.innerText = data.main.temp;
        tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
        
        // Save weather data to localStorage for later use
        saveWeatherData(data);
        
        // Store additional data for activity suggestions
        storeActivityData(data);

      } else {
        // Display error if city not found
        displayError("City not found. Please try again.");
      }
    } catch (error) {
      // Display error message if API fetch fails
      displayError("Error fetching weather data. Please try again later.");
      console.error("Error fetching weather data:", error); // Log error in console
    }
  };

  // Function to save key weather data to localStorage
  const saveWeatherData = (data) => {
    const weatherData = {
      cityName: data.name,
      region: data.sys.country,
      country: data.sys.country,
      localTime: new Date().toLocaleString(),
      currentTemp: data.main.temp,
      forecastTemp: data.main.feels_like,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      chanceRain: data.clouds.all,
      pressure: data.main.pressure,
      condition: data.weather[0].description,
    };

    // Store weather data in localStorage
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
  };

  // Function to store data used for activity suggestions
  const storeActivityData = (data) => {
    localStorage.setItem("cityName", data.name);
    localStorage.setItem("date", new Date().toLocaleDateString());
    localStorage.setItem("time", new Date().toLocaleTimeString());
    localStorage.setItem("condition", data.weather[0].description);
  };

  // Function to display error messages to the user
  const displayError = (message) => {
    document.querySelector(".result").innerHTML = `<p>${message}</p>`; 
  };

  // Initial call to display weather data for Washington when page loads
  searchWeather("Washington");

  // Function for "See More Details" button to navigate to info.html
  window.seeMoreDetails = () => {
    if (localStorage.getItem("weatherData")) {
      window.location.href = "info.html"; // Go to info.html if weather data exists
    } else {
      alert("Please search for a city first!"); // Prompt if no data available
    }
  };
});