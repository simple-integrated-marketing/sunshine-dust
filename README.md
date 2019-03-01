# ☀️🤯 Sunshine Dust

Sunshine Dust displays data from the [Willy Weather API](https://www.willyweather.com.au/info/api.html) in your site or app.

## Getting started

### 1. Import plugin and configure it

By default, Sunshine Dust creates a html structure with the [BEM](http://getbem.com/introduction/]) methodology.<br/>
If you'd like to adjust the markup then opt for option b.

#### a) Use the default templates

```js
import SunshineDust from 'sunshine-dust';

// The element where we'll add the weather
const el = document.querySelector('[data-weather]');

// The url for the weather data api
const apiUrl =
    'https://api.willyweather.com.au/v2/[YOUR_TOKEN]/locations/9495/weather.json?forecasts=weather';

// Start the plugin
new SunshineDust(el, apiUrl, { days: 1 });
```

This config will produce the following markup:

```html
<div class="weather weather--1day">
    <div class="weather__day">
        <div class="weather__icon">wi-day-sunny</div>
        <div class="weather__min">Min 26</div>
        <div class="weather__max">Max 41</div>
    </div>
</div>
```

#### b) Define custom templates

If you'd like complete control of the produced markup then you can create custom templates like this:

```js
import SunshineDust from "sunshine-dust";

// The template for the day(s) container
const templateContainer = data => (`
    <div class="${data.blockName}">${data.content}</div>
`);

// The template for each day
const templateDay = data => (`
    <div class="${data.blockName}__day">
        <div class="${data.blockName}__icon">${data.icon}</div>
        <div class="${data.blockName}__max">${data.max}</div>
        <div class="${data.blockName}__min">${data.min}</div>
    </div>
`);

// The element where we'll add the weather
const el = document.querySelector('[data-weather]');

// The url for the weather data api
const apiUrl =
  "https://api.willyweather.com.au/v2/[YOUR_TOKEN]/locations/9495/weather.json?forecasts=weather";

// Start the plugin
new SunshineDust(el, apiUrl, {
    {
        blockName: 'weather',
        days: 7,
        templateContainer,
        templateDay,
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

#### a) Use the default styles

In your SCSS, import the styles:

```scss
@import 'sunshine-dust/styles/main';
```

#### b) Define custom styles

You can also go fully custom with your styling.
No need to import anything, just style as you want.

## Credits

Created by [@benrogerson](https://twitter.com/benrogerson) @ [Simple](<[Simple](https://simple.com.au)>)

Swiff has been agency battletested by [Simple](https://simple.com.au) who specialise in Craft CMS websites.

## TODO:

-   [ ] Build icons into a sprite
-   [ ] Add basic styles
-   [ ] Transpile SCSS to CSS
