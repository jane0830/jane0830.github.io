//  Select elements
const bodyElement = document.querySelector("body");
const notificationElement = document.querySelector(".weather-description p");
const iconElement = document.querySelector("#weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descriptionElem = document.querySelector(".temperature-description p");
const locationElem = document.querySelector(".location p");
const currDateElement = document.querySelector(".current-date p");


//App data
const weather = {};

weather.temperature = {
  unit: "celsius"
}

//API key
const key = "86f83a43744c26b6095587c0c5b4fbe7";

//check if browser support geolocation
if("geolocation" in navigator){  
  navigator.geolocation.getCurrentPosition(setPosition, showError);  
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";  
}

//Set user's position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);  
}

//Show error when is an issue with geolocation service
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

//Get weather from api provider
function getWeather(latitude, longitude){
  let api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  
  fetch(api) 
    .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    console.log(data);
        weather.sunrise = data.sys.sunrise;
        weather.sunset = data.sys.sunset;
        weather.temperature.value = kelvinToCelsius(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
           
        displayWeather();
  })  
}

// display weather to ui
function displayWeather(){
  bodyElement.className = getTimeOfDay(weather.sunrise, weather.sunset);
  iconElement.className = icons[weather.description];  
  tempElement.innerHTML = `${weather.temperature.value} º <span>C</span>`;
  descriptionElem.innerHTML = weather.description;
  locationElem.innerHTML = `${weather.city}, ${weather.country}`;
  currDateElement.innerHTML = getCurrentDateString();
};

// K to C conversion
function kelvinToCelsius(temperature){
  return Math.floor(temperature - 273);
}

// C to F conversion
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;  
}

//when the user clicks on the temperature element
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit === "celsius"){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);    
    tempElement.innerHTML = `${fahrenheit}º <span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  }else{
    tempElement.innerHTML = `${weather.temperature.value}º <span>C</span>`;
     weather.temperature.unit = "celsius";
  }
});

//variables use in my getCurrentDateString
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//get the current day 
function getCurrentDateString(){
  const today = new Date(); 
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const dayOfMonth = today.getDate();  
  
  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
};

//get our icons setup in our app
const icons = {
  "clear sky": "fas fa-sun",
  "few clouds": "fas fa-cloud-sun",
  "scattered clouds": "fas fa-cloud",
  "broken clouds": "fas fa-cloud-meatball",
  "shower rain": "fas fa-cloud-showers-heavy",
  "rain": "fas fa-cloud-rain",
  "thunderstorm": "fas fa-poo-storm",
  "snow": "fas fa-snowflake",
  "mist": "fas fa-wind"
};

//dtermines whether or not it is day time 
function getTimeOfDay(sunrise, sunset){
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);
  const currentDate = new Date();
  if(currentDate > sunriseDate && currentDate < sunsetDate){
      return  "daytime";   
     }else {
       return "nighttime";
     }
}