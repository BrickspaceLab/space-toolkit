<img src="https://user-images.githubusercontent.com/4685863/225655352-0d8b3cd2-4b27-4565-9f60-e240a1285349.jpg" width="64" style="border-radius:4px;">

# Space

[Join Discord](https://discord.gg/4qdBFhmzCR) / [Download theme](https://themes.shopify.com/themes/space)

---

# Overview

This is a kit to help extend and customize the Space Shopify theme. You will need to have a valid copy of Space installed on your Shopify account in order to use this.

---

# Getting started

### Requirements

- Space installed on your Shopify account
- [NPM](https://www.npmjs.com/package/npm) (6.0.0 or higher)
- [Node.js](https://nodejs.org/en/download/) (16.0.0 or higher)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install) (3.0.0 or higher)

### Installing

1. Purchase Space from the Shopify theme store and create a duplicate
2. Clone this repo
3. Replace `space-theme-dev.myshopify.com` in `package.json` with your Shopify store URL
4. Run `npm install` to install dependencies
5. Run `npm run pull` to download the your theme (be sure to select the theme that has Space installed)
6. Run `npm run dev` to create a development preview
7. Run `npm run build` to build production ready assets

### Command refferance

| Task Name       | Description             |
| :-------------- | :---------------------- |
| `npm run dev`   | Run development preview |
| `npm run build` | Build prodution assets  |
| `npm run test`  | Run tests               |

---

# Making changes

### Development previews

Use `npm run dev` to setup a development preview that refreshes your CSS and JavaScript as you make changes. This is the best way to implement more in-depth changes on Paper. You should also consider implementing the [GitHub integration](https://shopify.dev/docs/themes/tools/github) into your workflow.

### Naming coventions

Paper uses a naming convention to help keep things organized. We use the following prefixes to help identify the files in our `/snippet` folder.

- `components__`: Components are reusable pieces of code that can be used in multiple places. Most of our components are used in multiple places throughout the theme.
- `theme__`: Theme files are only ever used in the `theme.liquid` file. These are global snippets that appear on every page of your theme.
- `script__`: Script files contain small snippets of JavaScript that are used throughout the theme.
- `article__`, `collection__`, `product__`: Article, collection and product files are used in their respecitive templates only.
- `header__`: Header files are used to within the header of your theme.

Section files follow a similar naming convention.

- Section files prefixed with a keyword and a double underscore are only used in their respecitve template files. E.g. `collection__banner.liquid` is only used in the `collection.liquid` file.

### Tips and tricks

- Use the `theme__styles.liquid` file to update or edit theme-wide CSS variables.

### Using Alpine.js

- For debugging there are [Chrome](https://chrome.google.com/webstore/detail/alpinejs-devtools/fopaemeedckajflibkpifppcankfmbhk) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/alpinejs-devtools/?src=recommended) browser extensions available.
- For an extensive list of Alpine resources take a look at this [repo](https://github.com/alpine-collective/awesome). 

---

# Resources

- [Discord community](https://discord.gg/4qdBFhmzCR)
- [Twitter updates](https://twitter.com/brickspacelab)
- [Our blog](https://brickspacelab.com/blogs/news)
- [Shopify Vite Plugin](https://shopify-vite.barrelny.com/)
- [Alpine.js](https://alpinejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

