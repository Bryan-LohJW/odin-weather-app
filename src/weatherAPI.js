const weatherState = (weatherData) => {
  const { name } = weatherData;
  console.log(name);
};

async function getWeather(location) {
  try {
    const key = 'cd422b923b03f0e42f9bffddb3a4239d';
    const geoPromise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`, { mode: 'cors' });
    const geoData = await geoPromise.json();
    const { lon } = geoData[0];
    const { lat } = geoData[0];

    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const weatherData = await weatherPromise.json();
    console.log(weatherData);
    weatherState(weatherData);
  } catch (error) {
    console.log(error);
  }
}

export default getWeather;
