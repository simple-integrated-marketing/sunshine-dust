import SunshineDust from './index.js';

// The element where we'll add the weather
const el = document.querySelector('[data-weather]');

// The url for the weather data api
const apiUrl =
    'https://api.willyweather.com.au/v2/ZjhlNzFmOWVlMjBlMjUxY2VjMzc3ND/locations/9495/weather.json?forecasts=weather';

new SunshineDust(el, apiUrl, {
    days: 60,
});
