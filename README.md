<p align="center">
  <a target="_blank" href="https://flatifycss.amimomo.me">
    <img src="https://raw.githubusercontent.com/ami-momo/flatifycss/master/website/static/img/logo.gif" alt="FlatifyCSS" width="160" height="160">
  </a>
</p>

<h3 align="center">FlatifyCSS</h3>

<p align="center">
  Modern flat design framework for the web, inspired by Duolingo design system.
</p>

<p align="center">
  <a target="_blank" href="https://flatifycss.amimomo.me/docs/intro">Documentation</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://flatifycss.amimomo.me/blog">News</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://github.com/ami-momo/flatifycss/issues">Issues</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a target="_blank" href="https://react-flatifycss.amimomo.me">React components</a>
</p>

<hr>

[![npm version](https://img.shields.io/npm/v/flatifycss)](https://www.npmjs.com/package/flatifycss)
[![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/flatifycss)](https://www.jsdelivr.com/package/npm/flatifycss)
[![Packagist](https://img.shields.io/packagist/v/amir2mi/flatifycss)](https://packagist.org/packages/amir2mi/flatifycss)
[![License: MIT](https://img.shields.io/npm/l/flatifycss)](LICENSE)

# Getting started

You can use FlatifyCSS in several ways:

- Install it using package managers
- Load it directly from a CDN
- Download the [latest project files](https://github.com/ami-momo/flatifycss/archive/master.zip)

## CDN

You can add FlatifyCSS using [jsDelivr](https://www.jsdelivr.com/) with these lines of code, `@2` keeps you on the latest 2.x release:

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/flatifycss@2/dist/css/flatify-min.css" rel="stylesheet" crossorigin="anonymous" />

<!-- JavaScript : Popperjs + FlatifyCSS -->
<script src="https://unpkg.com/@popperjs/core@2" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/flatifycss@2/dist/js/flatify-min.js" crossorigin="anonymous"></script>
```

Here is a whole page to start from:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/flatifycss@2/dist/css/flatify-min.css" rel="stylesheet" />
    <title>Hello FlatifyCSS</title>
  </head>
  <body class="container-md">
    <h1>Hello!</h1>
    <button class="button style-accent">It works</button>
  </body>
</html>
```

## Package managers

You can include FlatifyCSS in your project using npm, Yarn, Bun or Composer:

```bash
npm install flatifycss
yarn add flatifycss
bun add flatifycss
composer require amir2mi/flatifycss
```

Then import the files you need, for example in a bundler:

```js
import "flatifycss/dist/css/flatify-min.css";
import "flatifycss/dist/js/flatify-min.js";
```

## Sass

The Sass source is in the `/scss` folder. Every variable uses `!default`, so you can change colors, fonts and sizes without touching the package files:

```scss
@use "flatifycss/scss/flatify" with (
  $ACCENT_COLOR: #8e44ad,
  $BORDER_RADIUS: 0.5em
);
```

All variables are listed on the [customization page](https://flatifycss.amimomo.me/docs/overview/customization).

## Contents

After installing FlatifyCSS or downloading the archive file, you'll find a `/dist` folder with compiled CSS, JS, and their map files:

### CSS

- Files with `-noprefix` don't use [PostCSS Autoprefixer](https://github.com/postcss/autoprefixer)
- Files with `-min` are minified

Available CSS files:

- `flatify.css`
- `flatify-min.css`
- `flatify-noprefix.css`
- `flatify-noprefix-min.css`

The same files work for left to right and right to left pages, set `dir="rtl"` on `<html>`. The old `flatify-rtl*.css` files from version 1 are still there as copies, they will be removed in version 3.

### JS

Note: FlatifyCSS needs [Popperjs](https://popper.js.org/) for dropdowns and popovers. This library isn't included in FlatifyCSS's JavaScript file, so you need to add it to your webpage separately. The JavaScript is only needed for interactive components, see the [JavaScript page](https://flatifycss.amimomo.me/docs/overview/javascript).

- `flatify.js`
- `flatify-min.js`

## Dark mode

There is a `%dark-mode` Sass placeholder, and the compiled CSS can do it with a few CSS variables. Both ways are on the [dark mode page](https://flatifycss.amimomo.me/docs/overview/darkmode).

## React

Using React? [React FlatifyCSS](https://react-flatifycss.amimomo.me) has the components ready, with TypeScript types.

## Development

I use [Bun](https://bun.sh/) for everything here.

1. Run `bun install` in the root directory
2. Run `bun run build` to compile the stylesheet and JavaScript file into `/dist`
3. Run `bun run watch` while you work

The documentation website is in `/website`, run `bun install` and `bun start` there. For more information about FlatifyCSS's Gulp tasks, [read here](https://flatifycss.amimomo.me/docs/overview/development#gulp-tasks).

## Contributing

Found a bug or have an idea? [Open an issue](https://github.com/ami-momo/flatifycss/issues) first, then pull requests are welcome. Please keep changes small and follow the [code standards](https://flatifycss.amimomo.me/docs/overview/development#code-standards).

## License

[MIT](LICENSE)
