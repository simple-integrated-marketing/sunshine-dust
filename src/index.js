// Weather Wonka
export default class WeatherWonka {
    constructor(el, apiUrl, config) {
        this.el = el;
        this.apiUrl = apiUrl;

        // Backup and remove the element html
        this.beforeInnerContent = el.innerHTML;
        this.el.innerHTML = '';

        // Set the default variables
        const defaults = {
            blockName: 'weather',
            days: 1,
            iconMap: new Map(iconMapDefaults),
            dayNames,
            templateContainer,
            templateDay,
        };
        // Combine configs
        this.config = Object.assign({}, defaults, config);

        // Fix days if misconfigured
        if (this.config.days > 7 || this.config.days < 1) this.config.days = 7;

        this.isStarted = false;
        this.init();
    }

    async init() {
        if (this.isStarted || !!this.el.length) return;

        // Get the weather data
        const weatherData = await getRequest(this.apiUrl);
        if (!weatherData || !weatherData.forecasts)
            return console.error('Error connecting to the apiUrl');

        // Get the source day data from the weather forecast
        const { days: weatherDataDays } = weatherData.forecasts.weather;

        // Get the number of days to display
        const { days } = this.config;

        // Get the data for the number of days specified
        const dayData = getDayData(weatherDataDays, days);

        // Generate the markup for each of the days
        const dayHtml = dayData.map(day => {
            return this.config.templateDay(
                {
                    ...this.config,
                    ...day,
                    dayName: this.config.dayNames[
                        new Date(day.dateTime).getDay()
                    ],
                    icon: this.config.iconMap.get(day.precisCode),
                },
                dayData.length > 1 ? 'li' : 'div'
            );
        });

        // Generate the container markup and include the day markup
        const weatherHtml = this.config.templateContainer(
            {
                ...this.config,
                blockModifier: `${this.config.blockName}--${days}day${
                    days > 1 ? 's' : ''
                }`,
                content: dayHtml.join('\n'),
            },
            days > 1 ? 'ul' : 'div'
        );

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

// Define icon mappings
// ['precisCode', 'iconName']
const iconMapDefaults = [
    ['fine', 'weather-icon--day-sunny'],
    ['mostly-fine', 'weather-icon--day-cloudy'],
    ['high-cloud', 'weather-icon--day-cloudy-high'],
    ['partly-cloudy', 'weather-icon--day-cloudy'],
    ['mostly-cloudy', 'weather-icon--day-cloudy'],
    ['cloudy', 'weather-icon--cloudy'],
    ['overcast', 'weather-icon--cloudy'],
    ['shower-or-two', 'weather-icon--day-showers'],
    ['chance-shower-fine', 'weather-icon--day-showers'],
    ['chance-shower-cloud', 'weather-icon--day-showers'],
    ['drizzle', 'weather-icon--sprinkle'],
    ['few-showers', 'weather-icon--day-showers'],
    ['showers-rain', 'weather-icon--rain'],
    ['heavy-showers-rain', 'weather-icon--rain'],
    ['chance-thunderstorm-fine', 'weather-icon--day-storm-showers'],
    ['chance-thunderstorm-cloud', 'weather-icon--storm-showers'],
    ['chance-thunderstorm-showers', 'weather-icon--storm-showers'],
    ['thunderstorm', 'weather-icon--thunderstorm'],
    ['chance-snow-fine', 'weather-icon--day-snow-wind'],
    ['chance-snow-cloud', 'weather-icon--snow'],
    ['snow-and-rain', 'weather-icon--rain-mix'],
    ['light-snow', 'weather-icon--snow'],
    ['snow', 'weather-icon--snow'],
    ['heavy-snow', 'weather-icon--snow'],
    ['wind', 'weather-icon--strong-wind'],
    ['frost', 'weather-icon--snowflake-cold'],
    ['fog', 'weather-icon--fog'],
    ['hail', 'weather-icon--hail'],
    ['dust', 'weather-icon--dust'],
];

// Define daynames
const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// The template for the day(s) container
const templateContainer = (data, wrapTag) => `
    <${wrapTag} class="${data.blockName} ${data.blockModifier}">${
    data.content
}</${wrapTag}>
`;

// The template for each day
const templateDay = (data, wrapTag) => `
<${wrapTag} class="${data.blockName}__item">
    <div class="${data.blockName}__title">
        ${data.dayName}
    </div>
    <div class="${data.blockName}__details">
        <div class="${data.blockName}__icon" data-label="${data.precis}">
            <svg class="${
                data.blockName
            }__svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">
                <use xlink:href="#${data.icon}" />
            </svg>
        </div>
        <div class="${data.blockName}__min-max">
            <div class="${data.blockName}__temp ${data.blockName}__temp--min">
                <abbr class="${
                    data.blockName
                }__label" title="Minimum">Min</abbr>
                <span class="${data.blockName}__value">${data.min}</span>
            </div>
            <div class="${data.blockName}__temp ${data.blockName}__temp--max">
                <abbr class="${
                    data.blockName
                }__label" title="Maximum">Max</abbr>
                <span class="${data.blockName}__value">${data.max}</span>
            </div>
        </div>
    </div>
</${wrapTag}>
`;

// Fetch a response and convert to JSON
const getRequest = async url => {
    let request;
    await fetch(url, { mode: 'cors' })
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

// Make it available on the window object
// if that floats your boat
window.WeatherWonka = WeatherWonka;
