//variables
const OWApiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
const units = "metric";
// Dates
let momento = "";
momento = document.querySelector("#timeDisplay");
let today = new Date();
let time = today.getTime();
let hours = today.getHours();
if (hours < 10) hours = "0" + hours;
let minutes = today.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
let day = weekDays[today.getDay()];
momento.innerHTML = `${day} ${hours}:${minutes}`;

let firstday = document.querySelector("#day1day");
firstday.innerHTML = weekDays[today.getDay() + 1];
let secondday = document.querySelector("#day2day");
secondday.innerHTML = weekDays[today.getDay() + 2];
let thirdday = document.querySelector("#day3day");
thirdday.innerHTML = weekDays[today.getDay() + 3];
let fourthday = document.querySelector("#day4day");
fourthday.innerHTML = weekDays[today.getDay() + 4];
let fifthday = document.querySelector("#day5day");
fifthday.innerHTML = weekDays[today.getDay() + 5];
// Get city

const inputCity = document.querySelector("#search-city");
inputCity.addEventListener("submit", defineCity);

function defineCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#SearchTxt");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${OWApiKey}&units=${units}`;
  startIt(apiURL);
}

// Temperature
function showTemperature(response) {
  let searchedCity = response.data.name;
  let searchedCountry = response.data.sys.country;
  let messageCity = `Currently in ${searchedCity}, ${searchedCountry}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = messageCity;
  let temperature = Math.round(response.data.main.temp);
  let messageTemp = `${temperature}°C`;
  let showTemp = document.querySelector("#show-temp");
  showTemp.innerHTML = messageTemp;
  let weatherIcon = response.data.weather[0].icon;
  let icon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  let imageIcon = document.getElementById("iconToday");
  imageIcon.src = icon;
  /*
  let sunriseDate = new Date(response.data.sys.sunrise * 1000);
  let sunriseProva = response.data.sys.sunrise * 1000;
  let sunriseTime = sunriseDate.toLocaleTimeString();

  console.log(sunriseProva);
  console.log(sunriseDate);
  console.log(sunriseTime);

  let sunsetDate = new Date(response.data.sys.sunset * 1000);
  let sunsetTime = sunsetDate.toLocaleTimeString();

  console.log(sunsetDate);
  console.log(sunsetTime);

  let lowNumber = response.data.sys.sunrise * 1000;
  let timezoneAdjustement = response.data.timezone * 1000;
  let middleNumber = time - 3600000 + timezoneAdjustement;
  let highNumber = response.data.sys.sunset * 1000;
  console.log(time);
  console.log(response.data.timezone);
  console.log(timezoneAdjustement);
  console.log(middleNumber);*/
  let localTimeAdjustement = response.data.timezone / 3600;
  let localTime = hours - localTimeAdjustement;
  if (8 > localTime || localTime > 17) {
    let styler = document.getElementById("styleGiver");
    styler.classList = "container bg-dark text-white text-center";
  } else {
    let styler = document.getElementById("styleGiver");
    styler.classList = "container bg-light text-dark text-center";
  }
}

function startIt(URL) {
  document.querySelector("#SearchTxt").value = "";
  axios.get(URL).then(showTemperature);
}

//Get current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    let message = "Geolocation is not supported by this browser.";
    let h1 = document.querySelector("h1");
    h1.innerHTML = message;
  }
}
function showCity(response) {
  let currentCity = response.data[0].name;
  let currentCountry = response.data[0].country;
  let message = `Currently in ${currentCity}, ${currentCountry}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${OWApiKey}&units=${units}`;
  startIt(apiURL);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let reversoGeoApiURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OWApiKey}`;
  axios.get(reversoGeoApiURL).then(showCity);
}

const inputCurrent = document.querySelector("#currentPosition");
inputCurrent.addEventListener("click", getLocation);