const apiKey = 'a4ba2acf04224043824120806241712';
const cityInput = document.querySelector(".cityInput");
const searchBtn = document.querySelector(".searchBtn");
const regex = /^[a-zA-z\s]{3,}$/;

cityInput.addEventListener("keyup", function () {
    if (cityInput.value != "" && regex.test(cityInput.value) == true) {
        updateWeatherData(cityInput.value);
    } else {
        updateWeatherData("cairo");
    }
})

async function getWeatherData(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
    return response.json();
}

async function updateWeatherData(city) {
    const weatherData = await getWeatherData(city);
    var today = date = new Date(weatherData.forecast.forecastday[0].date);
    var tomorrow = new Date(weatherData.forecast.forecastday[1].date);
    var day3 = new Date(weatherData.forecast.forecastday[2].date);
    const options1 = {
        weekday: "long"
    }
    const options2 = {
        day: 'numeric',
        month: 'long'
    }
    today = today.toLocaleDateString('en-US', options1);
    tomorrow = tomorrow.toLocaleDateString('en-US', options1);
    day3 = day3.toLocaleDateString('en-US', options1);
    date = date.toLocaleDateString('en-US', options2);
    document.querySelector(".today-forecast .day").innerHTML = today;
    document.querySelector(".today-forecast .date").innerHTML = date;
    document.querySelector(".location").innerHTML = weatherData.location.name;
    document.querySelector(".temp").innerHTML = `${weatherData.current.temp_c}°C`;
    document.querySelector(".today-forecast .forecast-icon").setAttribute("src", `https:${weatherData.current.condition.icon}`);
    document.querySelector(".today-forecast p").innerHTML = weatherData.current.condition.text;
    document.querySelector(".tomorrow-forecast .day").innerHTML = tomorrow;
    document.querySelector(".tomorrow-forecast .forecast-icon").setAttribute("src", `https:${weatherData.forecast.forecastday[1].day.condition.icon}`);
    document.querySelector(".tomorrow-forecast .max-temp").innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c}°C`;
    document.querySelector(".tomorrow-forecast .min-temp").innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c}°`;
    document.querySelector(".tomorrow-forecast p").innerHTML = weatherData.forecast.forecastday[1].day.condition.text;
    document.querySelector(".day3-forecast .day").innerHTML = day3;
    document.querySelector(".day3-forecast .forecast-icon").setAttribute("src", `https:${weatherData.forecast.forecastday[2].day.condition.icon}`);
    document.querySelector(".day3-forecast .max-temp").innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c}°C`;
    document.querySelector(".day3-forecast .min-temp").innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c}°`;
    document.querySelector(".day3-forecast p").innerHTML = weatherData.forecast.forecastday[2].day.condition.text;
}

updateWeatherData("cairo");