const inputBox = document.querySelector(".input_box");
const searchBtn = document.getElementById("searchBtn");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("wind_speed");
const weatherimg = document.querySelector(".weather_img");
const locationError = document.querySelector(".location_error");
const weatherbody = document.querySelector("weather_body");

async function checkWeather(city) {
  const api_key = "4598b52f14141691ded25316aa58e581";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
      locationError.style.display = "flex";
      weatherbody.style.display = "none";
      // console.log('error');
      return;
    }
    else{
        locationError.style.display = "none";
        // weatherbody.style.display = "flex";
    }
    

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  windspeed.innerHTML = `${weather_data.wind.speed}km/hr`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weatherimg.src = "/assets/cloud.png";
      break;
    case "Clear":
      weatherimg.src = "/assets/clear.png";
      break;
    case "Mist":
      weatherimg.src = "/assets/mist.png";
      break;
    case "Rain":
      weatherimg.src = "/assets/rain.png";
      break;
    case "Snow":
      weatherimg.src = "/assets/snow.png";
      break;
  }
  //   console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
