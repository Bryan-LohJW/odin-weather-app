import getWeather from './weatherAPI';
import './style.css';

const startUp = () => {
  const body = document.querySelector('body');
  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  const topContent = document.createElement('div');
  topContent.setAttribute('id', 'topContent');

  const botContent = document.createElement('div');
  botContent.setAttribute('id', 'botContent');

  content.appendChild(topContent);
  content.appendChild(botContent);
  body.appendChild(content);
};

startUp();
getWeather('Singapore');
