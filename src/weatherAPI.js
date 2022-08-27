const weatherStateMetric = (weatherData, div = 'topContent') => {
  const degreesCelcius = String.fromCodePoint(8451);
  const { name } = weatherData;
  const weather = weatherData.weather[0].main;
  let { temp } = weatherData.main;
  const { speed } = weatherData.wind;
  temp -= 273.15;
  temp = temp.toPrecision(3);

  const locationName = document.createElement('p');
  locationName.innerHTML = `${name}`;

  const locationCondition = document.createElement('p');
  locationCondition.innerHTML = `${weather}`;

  const locationTemp = document.createElement('p');
  locationTemp.innerHTML = `${temp}${degreesCelcius}`;

  const locationWindSpeed = document.createElement('p');
  locationWindSpeed.innerHTML = `${(speed * 3.6).toPrecision(3)}kph`;

  const contentBody = document.getElementById(`${div}`);

  contentBody.appendChild(locationName);
  contentBody.appendChild(locationCondition);
  contentBody.appendChild(locationTemp);
  contentBody.appendChild(locationWindSpeed);
};

const weatherForecastMetric = (weatherData, div = 'botContent') => {
  for (let i = 7; i < weatherData.list.length; i += 8) {
    console.log(weatherData.list[i]);
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
  try {
    const key = 'cd422b923b03f0e42f9bffddb3a4239d';
    const geoPromise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`, { mode: 'cors' });
    const geoData = await geoPromise.json();
    const { lon } = geoData[0];
    const { lat } = geoData[0];

    const weatherStatePromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const weatherData = await weatherStatePromise.json();
    weatherStateMetric(weatherData);

    const weatherForecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    const weatherForecast = await weatherForecastPromise.json();
    weatherForecastMetric(weatherForecast);
  } catch (error) {
    console.log(error);
  }
}

export default getWeather;
