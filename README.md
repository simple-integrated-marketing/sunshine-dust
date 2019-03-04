# Weather Wonka

Weather Wonka displays data from the [Willy Weather API](https://www.willyweather.com.au/info/api.html) in your site or app.

[![default visuals](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/screenie.png)](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/screenie.png)

## Getting started

### 1. Import plugin and configure it

The default template creates [BEM](http://getbem.com/introduction]) based markup.<br/>
If you'd like to adjust the markup then choose the 'b' option below.

#### a) Use the default templates

```js
import WeatherWonka from 'weather-wonka';

// The element where the html will be added
const el = document.querySelector('[data-weather]');

// The url for the weather data api
const apiUrl =
    'https://api.willyweather.com.au/v2/[YOUR_WILLY_WEATHER_KEY]/locations/8672/weather.json?forecasts=weather';

// Start the plugin
new WeatherWonka(el, apiUrl, { days: 1 });
```

This config will produce the following markup:

```html
<a href="#" data-weather="">
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
</a>
```

#### b) Define custom templates

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
        <div class="${data.blockName}__icon">${data.icon}</div>
        <div class="${data.blockName}__precis">${data.precis}</div>
        <div class="${data.blockName}__max">${data.max}</div>
        <div class="${data.blockName}__min">${data.min}</div>
    </div>
`);

// The element where the html will be added
const el = document.querySelector('[data-weather]');

// The url for the weather data api
const apiUrl =
  "https://api.willyweather.com.au/v2/[YOUR_WILLY_WEATHER_KEY]/locations/8672/weather.json?forecasts=weather";

// Customise the day names
const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// Start the plugin
new WeatherWonka(el, apiUrl, {
    {
        blockName: 'weather',
        days: 7,
        templateContainer,
        templateDay,
        dayNames,
    }
});
```

### 2. Add the selector to your markup

Add the selector to an element and the inner html will be replaced with the weather markup.<br/>
In this case, we'll be linking to a weather page when the weather is selected and if JavaScript is disabled, the user will see a plain link instead:

```html
<a href="#" data-weather>View the weather</a>
```

### 3. Style the markup

Either use the default scss styles as a starting point:

```scss
@import 'weather-wonka/src/styles';
```
Or write custom styles for to suit the markup.

## Icons

We've included [some icons to get you started](https://raw.githubusercontent.com/simple-integrated-marketing/weather-wonka/master/icon-examples.zip) but you can define your own custom icons.<br>
The default templates assume you're using a SVG icon sprite within your markup.

## Demo

Add your Willy Weather API key within `weather-wonka/src/demo.html` then run `npm start`.


## Credits

Weather Wonka is created by [@benrogerson](https://twitter.com/benrogerson) @ [Simple](<[Simple](https://simple.com.au)>).