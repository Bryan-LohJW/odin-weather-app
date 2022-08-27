import getWeather from './weatherAPI';

const startUp = function () {
  const body = document.querySelector('body');
  const topContent = document.createElement('div');
  topContent.setAttribute('id', 'topContent');
  body.appendChild(topContent);

  const botContent = document.createElement('div');
  botContent.setAttribute('id', 'botContent');
  body.appendChild(botContent);
};

startUp();
getWeather('Singapore');
