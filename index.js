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

        this.isStarted = false;
        this.init();
    }

    async init() {
        if (this.isStarted || !!this.el.length) return;

        // Get the weather data
        const weatherData = await getRequest(this.apiUrl);
        if (!weatherData)
            return console.error('Error connecting to the apiUrl');

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
    ['fine', 'day-sunny'],
    ['mostly-fine', 'day-cloudy'],
    ['high-cloud', 'day-cloudy-high'],
    ['partly-cloudy', 'day-cloudy'],
    ['mostly-cloudy', 'day-cloudy'],
    ['cloudy', 'cloudy'],
    ['overcast', 'cloudy'],
    ['shower-or-two', 'showers'],
    ['chance-shower-fine', 'day-showers'],
    ['chance-shower-cloud', 'showers'],
    ['drizzle', 'sprinkle'],
    ['few-showers', 'showers'],
    ['showers-rain', 'rain'],
    ['heavy-showers-rain', 'rain'],
    ['chance-thunderstorm-fine', 'day-storm-showers'],
    ['chance-thunderstorm-cloud', 'storm-showers'],
    ['chance-thunderstorm-showers', 'storm-showers'],
    ['thunderstorm', 'thunderstorm'],
    ['chance-snow-fine', 'day-snow-wind'],
    ['chance-snow-cloud', 'snow'],
    ['snow-and-rain', 'rain-mix'],
    ['light-snow', 'snow'],
    ['snow', 'snow'],
    ['heavy-snow', 'snow'],
    ['wind', 'strong-wind'],
    ['frost', 'snowflake-cold'],
    ['fog', 'fog'],
    ['hail', 'hail'],
    ['dust', 'dust'],
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
