import getWeather from './weatherAPI';

const startUp = function () {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.classList.add('content');
  body.appendChild(content);
};

startUp();
getWeather('London');
