async function getCoordinates(location) {
  try {
    const latPromise = fetch();
    const lonPromise = fetch();
    const [lat, lon] = await Promise.all([latPromise, lonPromise]);
    return [lat, lon];
  } catch (error) {
    console.log(error);
  }
}

async function getWeather([lat, lon]) {
  try {
    const key = '4e767ccf870324498e595e40179c0c00';
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const weatherData = await weatherPromise.json();
    const { weather } = weatherData;
  } catch (error) {
    console.log(error);
  }
  // console.log(weather);
  return weather;
}

const weather = getWeather(['30', '40']);

console.log('hl');
