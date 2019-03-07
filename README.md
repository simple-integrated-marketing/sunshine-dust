# Weather Wonka

[![npm version](https://badge.fury.io/js/weather-wonka.svg)](https://www.npmjs.com/package/weather-wonka)

Weather Wonka displays data from the [Willy Weather API](https://www.willyweather.com.au/info/api.html) in your site or app.

[![default visuals](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/screenie.png)](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/screenie.png)

## Features

🐳 Lightweight JavaScript (1.93 kB gzipped)<br>
☀️ Customisable 1 to 7 day forecast markup<br>
🏁 [BEM](http://getbem.com/introduction]) classes in default templates<br>
☔️ Weather icon sprite included

## Getting started

### 1. Install the plugin:

```npm install weather-wonka```

### 2a. Basic configuration:

```js
import WeatherWonka from 'weather-wonka';

// The element where the html will be added
const el = document.querySelector('[data-weather]');

// The url for the weather data api
// Cors issues when testing locally? Prefix url with 'https://cors.io/?'
const apiUrl = 'https://api.willyweather.com.au/v2/[YOUR_WILLY_WEATHER_KEY]/locations/8672/weather.json?forecasts=weather';

// Start the plugin
new WeatherWonka(el, apiUrl, { days: 1 });
```

This will produce the following markup:

```html
<div class="weather weather--1day">
    <div class="weather__item">
        <div class="weather__title">
            Monday
        </div>
        <div class="weather__details">
            <div class="weather__icon" data-label="Mostly sunny">
                <svg
                    class="weather__svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                >
                    <use xlink:href="#weather-icon--day-cloudy"></use>
                </svg>
            </div>
            <div class="weather__min-max">
                <div class="weather__temp weather__temp--min">
                    <abbr class="weather__label" title="Minimum">Min</abbr>
                    <span class="weather__value">17</span>
                </div>
                <div class="weather__temp weather__temp--max">
                    <abbr class="weather__label" title="Maximum">Max</abbr>
                    <span class="weather__value">31</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 2b. Custom configuration:

If you'd like complete control of the produced markup then you can create custom templates like this:

```js
import WeatherWonka from "weather-wonka";

// The template for the day(s)
const templateContainer = data => (`
    <div class="${data.blockName}">${data.content}</div>
`);

// The template for each day
const templateDay = data => (`
    <div class="${data.blockName}__item">
        <div class="${data.blockName}__day">${data.dayName}</div>
        <svg
            class="${data.blockName}__icon"
            data-label="${data.precis}"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
        >
            <use xlink:href="#${data.icon}"></use>
        </svg>
        <div class="${data.blockName}__precis">${data.precis}</div>
        <div class="${data.blockName}__min">Min ${data.min}</div>
        <div class="${data.blockName}__max">Max ${data.max}</div>
    </div>
`);

// Customise the day names
const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// The element where the html will be added
const el = document.querySelector('[data-weather]');

// The url for the weather data api
// Cors issues when testing locally? Prefix url with 'https://cors.io/?'
const apiUrl = "https://api.willyweather.com.au/v2/[YOUR_WILLY_WEATHER_KEY]/locations/8672/weather.json?forecasts=weather";

// Start the plugin
new WeatherWonka(el, apiUrl, {
    blockName: 'weather',
    days: 7,
    templateContainer,
    templateDay,
    dayNames,
});
```

### 3. Add the weather container to your markup

Add the container with the data-weather selector and the inner html will be replaced with the weather markup.<br/>
In this example I'm providing a link to a weather page when the weather is selected:

```html
<a href="#" data-weather>View the weather</a>
```

### 4. Import the default SCSS

Import the default SCSS styles as a starting point:

```scss
@import 'weather-wonka/src/styles';
```

Alternately you can style the markup as you wish.

### 5. Add the default icons

Included is a set of free weather icons within an icon sprite.

There's two options here, you can either:

### 5a. Using TWIG templates?

Include [weather-icons.twig](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/weather-icons.twig.zip) into your markup:

```twig
<body>
    {% include 'weather-icons.twig' %}
    ...
</body>
```

### 5b. Or insert the SVG sprite with JavaScript

Use JavaScipt to insert the [SVG sprite](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/weather-icons.svg.zip) at the top of the `<body>...</body>`.

## Customising icons

Add your own custom icons by replacing the SVG symbols within the icon sprite.

## Demo

Take a look at the demo - you'll need a [Willy Weather API key](https://www.willyweather.com.au/api/register.html):

1. Add your key within:<br>
`./node_modules/weather-wonka/src/demo.html`
2. cd into `./node_modules/weather-wonka`
3. Run `npm install && npm start`

## Credits

Weather Wonka is created by [Simple](<[Simple](https://simple.com.au)>).
