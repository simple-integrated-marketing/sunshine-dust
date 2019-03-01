// ☀️🤯 Sunshine Dust
// Sunshine Dust displays data from the Willy Weather API in your site or app.

export default class SunshineDust {
    constructor(el, apiUrl, config) {
        // Momoize the
        this.el = el;
        this.apiUrl = apiUrl;

        // Backup and remove the element html
        this.beforeInnerContent = el.innerHTML;
        this.el.innerHTML = '';

        // Set the default variables
        const defaults = {
            blockName: 'weather',
            days: 1,
            templateContainer,
            templateDay,
        };
        // Combine configs
        this.config = Object.assign({}, defaults, config);
        console.log(this.config);
        this.isStarted = false;
        this.init();
    }

    async init() {
        if (this.isStarted || !!this.el.length) return;

        // Get the weather data
        const weatherData = await getRequest(this.apiUrl);

        // Get the source day data from the weather forecast
        const { days: weatherDataDays } = weatherData.forecasts.weather;

        // Get the number of days to display
        const { days } = this.config;

        // Get the data for the number of days specified
        const dayData = getDayData(weatherDataDays, days);

        // Generate the markup for each of the days
        const dayHtml = dayData.map(day => {
            return this.config.templateDay({
                ...this.config,
                ...day,
                icon: iconMap.get(day.precisCode),
            });
        });

        // Generate the container markup and include the day markup
        const weatherHtml = this.config.templateContainer({
            ...this.config,
            blockModifier: `${this.config.blockName}--${days}day${
                days > 1 ? 's' : ''
            }`,
            content: dayHtml.join('\n'),
        });

        // Add the markup within our element
        this.el.innerHTML = weatherHtml;

        this.isStarted = true;
    }

    // Restore the original view
    destroy() {
        if (!this.isStarted) return;
        this.el.innerHTML = this.beforeInnerContent;
        this.isStarted = false;
    }
}

// Map the precisCode to an icon
const iconMap = new Map([
    ['fine', 'wi-day-sunny'],
    ['mostly-fine', 'wi-day-cloudy'],
    ['high-cloud', 'wi-day-cloudy-high'],
    ['partly-cloudy', 'wi-day-cloudy'],
    ['mostly-cloudy', 'wi-day-cloudy'],
    ['cloudy', 'wi-cloudy'],
    ['overcast', 'wi-cloudy'],
    ['shower-or-two', 'wi-showers'],
    ['chance-shower-fine', 'wi-day-showers'],
    ['chance-shower-cloud', 'wi-showers'],
    ['drizzle', 'wi-sprinkle'],
    ['few-showers', 'wi-showers'],
    ['showers-rain', 'wi-rain'],
    ['heavy-showers-rain', 'wi-rain'],
    ['chance-thunderstorm-fine', 'wi-day-storm-showers'],
    ['chance-thunderstorm-cloud', 'wi-storm-showers'],
    ['chance-thunderstorm-showers', 'wi-storm-showers'],
    ['thunderstorm', 'wi-thunderstorm'],
    ['chance-snow-fine', 'wi-day-snow-wind'],
    ['chance-snow-cloud', 'wi-snow'],
    ['snow-and-rain', 'wi-rain-mix'],
    ['light-snow', 'wi-snow'],
    ['snow', 'wi-snow'],
    ['heavy-snow', 'wi-snow'],
    ['wind', 'wi-strong-wind'],
    ['frost', 'wi-snowflake-cold'],
    ['fog', 'wi-fog'],
    ['hail', 'wi-hail'],
    ['dust', 'wi-dust'],
]);

// The template for the day(s) container
const templateContainer = data => `
    <div class="${data.blockName} ${data.blockModifier}">${data.content}</div>
`;

// The template for each day
const templateDay = data => `
    <div class="${data.blockName}__day">
        <div class="${data.blockName}__icon">${data.icon}</div>
        <div class="${data.blockName}__min">Min ${data.min}</div>
        <div class="${data.blockName}__max">Max ${data.max}</div>
    </div>
`;

// Fetch a response and convert to JSON
const getRequest = async url => {
    let request;
    await fetch(url)
        .then(response => {
            request = response.json();
        })
        .catch(error => {
            return console.error('Error:', error, url);
        });
    return request;
};

// Get the simplified day data from the Willy Weather json
const getDayData = (days, dayLimit) =>
    days
        .map((day, index) => {
            const firstResult = day.entries && day.entries[0];
            return index + 1 <= dayLimit ? { ...firstResult } : null;
        })
        .filter(Boolean);
