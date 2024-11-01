document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const valueSearch = document.getElementById("name");
  
  const city = document.querySelector(".name figcaption");
  const countryFlag = document.querySelector(".name img");
  const tempDisplay = document.querySelector(".temperature figcaption span");
  const tempIcon = document.querySelector(".temperature img");
  const description = document.querySelector(".description");
  const clouds = document.getElementById("clouds");
  const humidity = document.getElementById("humidity");
  const pressure = document.getElementById("pressure");

  const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value !== '') {
      searchWeather(valueSearch.value);
    }
  });

  const searchWeather = async (cityName) => {
    try {
      const response = await fetch(`${apiURL}&q=${cityName}`); // Corrected to use backticks
      const data = await response.json();

      if (data.cod === 200) {
        city.innerText = data.name;
        countryFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        tempDisplay.innerText = data.main.temp;
        tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
        
        saveWeatherData(data);
        storeActivityData(data);

      } else {
        displayError("City not found. Please try again.");
      }
    } catch (error) {
      displayError("Error fetching weather data. Please try again later.");
      console.error("Error fetching weather data:", error);
    }
  };

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

    localStorage.setItem("weatherData", JSON.stringify(weatherData));
  };

  const storeActivityData = (data) => {
    localStorage.setItem("cityName", data.name);
    localStorage.setItem("date", new Date().toLocaleDateString());
    localStorage.setItem("time", new Date().toLocaleTimeString());
    localStorage.setItem("condition", data.weather[0].description);
  };

  const displayError = (message) => {
    document.querySelector(".result").innerHTML = `<p>${message}</p>`; 
  };

  searchWeather("Washington");

  window.seeMoreDetails = () => {
    if (localStorage.getItem("weatherData")) {
      window.location.href = "info.html";
    } else {
      alert("Please search for a city first!");
    }
  };
});