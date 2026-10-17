# Shopfront

A storefront project built with React, TypeScript, and Vite.

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The development server supports hot reload.

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — type-check and create a production build in `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — check source files with ESLint

## Project structure

- `src/` — application code and styles
- `public/` — static files served from the site root

Product catalog, cart, checkout, and payment integration can be added once the store requirements are defined.
# ShopFront

A responsive product catalogue with catalogue, product details, and cart pages. Product data is accessed through `src/api/products.ts`, keeping API calls separate from UI components.

## Run locally

```sh
npm install
npm run dev
```

The app uses the DummyJSON products API by default. To point it at another compatible API, add a `.env` file:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

The API should provide `/products`, `/products/search`, `/products/categories`, and `/products/:id` endpoints with a product shape compatible with `src/types.ts`. The cart is stored in browser local storage; connect the checkout action to your order API when available.
