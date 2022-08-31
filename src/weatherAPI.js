const changeUnits = () => {
  const metrics = document.getElementsByClassName('metric');
  const imperials = document.getElementsByClassName('imperial');
  for (let i = 0; i < metrics.length; i += 1) {
    if (metrics[i].classList.contains('temperature')) {
      let temp = Number(metrics[i].innerHTML);
      console.log(temp);
      temp = temp * (9 / 5) + 32;
      console.log(temp);
      metrics[i].innerHTML = temp.toPrecision(3);
      console.log(temp);
    } else if (metrics[i].classList.contains('speed')) {
      let speed = Number(metrics[i].innerHTML);
      speed /= 1.609;
      console.log(metrics[i]);
      metrics[i].innerHTML = speed.toPrecision(3);
    }
  }
  for (let i = 0; i < imperials.length; i += 1) {
    if (imperials[i].classList.contains('temperature')) {
      let temp = Number(imperials[i].innerHTML);
      temp = (temp - 32) * (5 / 9);
      imperials[i].innerHTML = temp.toPrecision(3);
    } else if (imperials[i].classList.contains('speed')) {
      let speed = Number(imperials[i].innerHTML);
      speed *= 1.609;
      imperials[i].innerHTML = speed.toPrecision(3);
    }
  }
  const speeds = document.getElementsByClassName('speed');
  const temperatures = document.getElementsByClassName('temperature');
  for (let i = 0; i < speeds.length; i += 1) {
    speeds[i].classList.toggle('imperial');
    speeds[i].classList.toggle('metric');
  }
  for (let i = 0; i < temperatures.length; i += 1) {
    temperatures[i].classList.toggle('imperial');
    temperatures[i].classList.toggle('metric');
  }
  console.log('success');
};

const searchBarPlacement = (div) => {
  const form = document.createElement('form');

  const searchBar = document.createElement('input');
  searchBar.setAttribute('type', 'text');
  searchBar.setAttribute('id', 'location');
  searchBar.setAttribute('placeholder', 'Location');
  // searchBar.setAttribute('required');
  const searchButton = document.createElement('button');
  searchButton.setAttribute('type', 'submit');
  searchButton.innerHTML = 'Search';

  const content = document.getElementById(`${div}`);

  form.appendChild(searchBar);
  form.appendChild(searchButton);
  content.insertBefore(form, content.firstChild);
};

const formInitialize = () => {
  const form = document.querySelector('form');
  const searchBar = document.querySelector('input');
  form.onsubmit = () => {
    getWeather(searchBar.value);
    return false;
  };
};

const clearContent = () => {
  const top = document.querySelector('#topContent');
  const bot = document.querySelector('#botContent');
  while (top.hasChildNodes()) {
    top.removeChild(top.firstChild);
  }
  while (bot.hasChildNodes()) {
    bot.removeChild(bot.firstChild);
  }
};

const weatherStateMetric = (weatherData, div = 'topContent', wallpaperBody = 'content') => {
  const { name } = weatherData;
  const weather = weatherData.weather[0].description;
  const weatherGroup = weatherData.weather[0].main;
  let { temp } = weatherData.main;
  const { speed } = weatherData.wind;
  const { humidity } = weatherData.main;
  temp -= 273.15;
  temp = temp.toPrecision(3);

  const button = document.createElement('button');
  button.setAttribute('id', 'unit-switch');
  button.addEventListener('click', () => { changeUnits(); });

  const locationName = document.createElement('p');
  locationName.innerHTML = `${name}`;

  const locationCondition = document.createElement('p');
  const weatherArray = weather.split(' ');
  let weatherString = '';
  for (let i = 0; i < weatherArray.length; i += 1) {
    const firstLetter = weatherArray[i].slice(0, 1).toUpperCase();
    const rest = weatherArray[i].slice(1, weatherArray[i].length);
    weatherString += `${firstLetter}${rest} `;
  }
  weatherString.trimEnd();
  locationCondition.innerHTML = `${weatherString}`;

  const locationTemp = document.createElement('p');
  locationTemp.innerHTML = `${temp}`;
  locationTemp.classList.add('metric');
  locationTemp.classList.add('temperature');

  const locationHumidity = document.createElement('p');
  locationHumidity.innerHTML = `Humidity: ${humidity}%`;

  const locationWindSpeed = document.createElement('p');
  locationWindSpeed.innerHTML = `${(speed * 3.6).toPrecision(3)}`;
  locationWindSpeed.classList.add('metric');
  locationWindSpeed.classList.add('speed');

  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  d.setTime(weatherData.dt * 1000);
  const forecastDate = document.createElement('p');
  forecastDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]}, ${days[d.getDay() - 1]}`;

  const picture = document.createElement('img');
  const wallpaper = document.getElementById(`${wallpaperBody}`);
  switch (true) {
    case weatherGroup === 'Thunderstorm':
      picture.setAttribute('src', '../src/icons8-storm-96.png');
      picture.setAttribute('alt', 'Thunderstorm Icon');
      wallpaper.classList.add('rainy');
      break;
    case weatherGroup === 'Drizzle' || weatherGroup === 'Rain' || weatherGroup === 'Snow':
      picture.setAttribute('src', '../src/icons8-rain-96.png');
      picture.setAttribute('alt', 'Rain Icon');
      wallpaper.classList.add('rainy');
      break;
    case weatherGroup === 'Clear':
      picture.setAttribute('src', '../src/icons8-sun-192.png');
      picture.setAttribute('alt', 'Clear Icon');
      wallpaper.classList.add('clear');
      break;
    case weatherGroup === 'Clouds':
      picture.setAttribute('src', '../src/icons8-cloud-96.png');
      picture.setAttribute('alt', 'Cloudy Icon');
      wallpaper.classList.add('cloudy');
      break;
    default:
      wallpaper.classList('clear');
      break;
  }

  const contentBody = document.getElementById(`${div}`);
  const firstSplit = document.createElement('div');
  firstSplit.setAttribute('id', 'top-first');
  const secondSplit = document.createElement('div');
  secondSplit.setAttribute('id', 'top-second');
  const thirdSplit = document.createElement('div');
  thirdSplit.setAttribute('id', 'top-third');
  const fourthSplit = document.createElement('div');
  fourthSplit.setAttribute('id', 'top-fourth');

  firstSplit.appendChild(button);
  firstSplit.appendChild(forecastDate);
  secondSplit.appendChild(locationName);
  thirdSplit.appendChild(locationCondition);
  thirdSplit.appendChild(picture);
  fourthSplit.appendChild(locationTemp);
  fourthSplit.appendChild(locationHumidity);
  fourthSplit.appendChild(locationWindSpeed);
  contentBody.appendChild(firstSplit);
  contentBody.appendChild(secondSplit);
  contentBody.appendChild(thirdSplit);
  contentBody.appendChild(fourthSplit);
  searchBarPlacement('top-first');
  formInitialize();
};

const weatherForecastMetric = (weatherData, div = 'botContent') => {
  for (let i = 7; i < weatherData.list.length; i += 8) {
    const degreesCelcius = String.fromCodePoint(8451);
    const content = document.getElementById(`${div}`);
    const container = document.createElement('div');

    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    d.setTime(weatherData.list[i].dt * 1000);
    const forecastDate = document.createElement('p');
    forecastDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]}`;

    const weatherState = document.createElement('p');
    weatherState.innerHTML = weatherData.list[i].weather[0].main;

    const tempFeels = document.createElement('p');
    const tempFeelsValue = (weatherData.list[i].main.feels_like - 273.15).toPrecision(3);
    tempFeels.innerHTML = tempFeelsValue + degreesCelcius;

    const tempActual = document.createElement('p');
    const tempActualValue = (weatherData.list[i].main.temp - 273.15).toPrecision(3);
    tempActual.innerHTML = tempActualValue + degreesCelcius;

    container.appendChild(forecastDate);
    container.appendChild(weatherState);
    container.appendChild(tempFeels);
    container.appendChild(tempActual);
    content.appendChild(container);
  }
};

async function getWeather(location) {
  let weatherData;
  let weatherForecast;
  try {
    const key = 'cd422b923b03f0e42f9bffddb3a4239d';
    const geoPromise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`, { mode: 'cors' });
    const geoData = await geoPromise.json();
    const { lon } = geoData[0];
    const { lat } = geoData[0];

    const weatherStatePromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    weatherData = await weatherStatePromise.json();

    const weatherForecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    weatherForecast = await weatherForecastPromise.json();
    clearContent();
    weatherStateMetric(weatherData);
    weatherForecastMetric(weatherForecast);
  } catch (error) {
    console.log(error);
  }
  return [weatherData, weatherForecast];
}

export default getWeather;
