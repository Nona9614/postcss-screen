PostCSS Screen Plugin
================================

This plugin has the purpose to be `sugar syntax` for [width media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width).

``` CSS
/** This is the sugar syntax */
@small-screen {
    div {
        width: 400px; 
    }
}

/** This is what it would look like after parsing */
@media (max-width: 980px) {
    div {
        width: 400px; 
    }
}
```

Installation
----------------
To install it, you can paste the following text to your terminal.

``` npm
npm install postcss postcss-screen
```

About
----------------
This plugin has 8 standard screen sizes for the HTML to react with CSS, where each one will replace a custom [at rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) with a supported media query.

| Size     | Width  |
|----------|--------|
| jumbo    | 2200px |
| wide     | 2000px |
| large    | 1700px |
| moderate | 1450px |
| medium   | 1200px |
| small    | 980px  |
| mini     | 670px  |
| nano     | 450px  |

Options
--------------------------------

The plugin can be customized to have custom response sizes or custom parameters for the query.

``` js
// To pass your options it can be done in the following way
postcss: {
    plugins: [
        ...,
        require('postcss-screen')({ 
            query: 'max-width',
            sizes: { small: 1000 },
        }),
    ]
}

// Other frameworks may use a map object
postcss: {
    plugins: {
        ...,
        "postcss-screen": {
            sizes: { small: 1000 },
            query: 'max-width',
            params: 'only screen and',
        }
    }
}
```
### Sizes
There will be some cases when a custom size is desired. For such cases, this can be passed to the options in the `sizes` object as a *key pair* value (Check the [example above](#options)).

``` CSS
/** This is the sugar syntax */
@small-screen {
    div {
        width: 400px; 
    }
}

/** This is what it would look with a custom small size of 1000 */
@media (min-width: 1000px) {
    div {
        width: 400px; 
    }
}
```

### Queries
In some cases the desired behavior is to apply with the `min-width` instead of the `max-width` query. If that is the case, this value can be passed in the `query` property from the options.

``` CSS
/** This is the sugar syntax */
@small-screen {
    div {
        width: 400px; 
    }
}

/** This is what it would look with the custom query */
@media (min-width: 980px) {
    div {
        width: 400px; 
    }
}
```
### Params
In case is wanted to attach specific media at rule paramateres, this can be done with the `params` property from the options.

``` CSS
/** This is the sugar syntax */
@small-screen {
    div {
        width: 400px; 
    }
}

/**
 * This is what it would look with custom parameters
 * like `only screen and` for legacy browsers
 * @see https://www.geeksforgeeks.org/what-is-the-difference-between-screen-and-only-screen-in-media-queries/
*/
@media only screen and (min-width: 980px) {
    div {
        width: 400px; 
    }
}
```
> __For Requests__<br>
> If you wish to contribute to this plugin you can visit me in the __*public*__ repository on [github](https://github.com/) at https://github.com/Nona9614/postcss-screen and discuss about it.<br>
*I will be happy to improve this project to its best!*
