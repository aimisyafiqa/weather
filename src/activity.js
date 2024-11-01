document.addEventListener("DOMContentLoaded", () => {
    // Fetch saved data from localStorage
    const cityName = localStorage.getItem("cityName") || "--";
    const date = localStorage.getItem("date") || "--";
    const time = localStorage.getItem("time") || "--";
    const condition = localStorage.getItem("condition") || "clear";

    // Display city, date, and time in the HTML
    document.getElementById("location").innerText = `City: ${cityName}`;
    document.getElementById("date").innerText = date;
    document.getElementById("time").innerText = time;

    // Prepare activities based on weather condition
    switch (condition.toLowerCase()) {
        case "clear sky":
        case "few clouds":
        case "scattered clouds":
        case "broken clouds":
        case "overcast clouds":
          activities = ["Hiking", "Picnic", "Cycling"];
          break;
        case "shower rain":
        case "rain":
        case "thunderstorm":
        case "light rain":
          activities = ["Museum Visit", "Aquarium Tour", "Indoor Climbing"];
          break;
        case "snow":
          activities = ["Skiing", "Snowboarding", "Ice Skating"];
          break;
        case "mist":
        case "smoke":
        case "haze":
        case "dust":
        case "fog":
        case "sand":
        case "ash":
        case "squall":
          activities = ["Walking Tour", "Sightseeing"];
          break;
        default:
          activities = ["Walking Tour", "Sightseeing"];
          break;
      }

    // Populate the activity list in the HTML
    activityList.innerHTML = activities
        .map(activity => 
            `<div class="activity-item">
                <h3>${activity}</h3>
                <p>Enjoy ${activity.toLowerCase()} on a ${condition} day in ${cityName}!</p>
            </div>`
        )
        .join("");
});
