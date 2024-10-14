# hamburg-election-district-by-street

> This project helps to research election districts for the Hamburg election 2025.

## Setup GCP storage bucket

* Create bucket
  * Location type: Region
  * Location: europe-west3 (Frankfurt)
  * Storage class: Standard
  * No public access prevention
  * No Soft delete policy
* Grant access for "allUsers" with role "Storage Object Viewer"
* Bucket overview > 3 dot menu > Edit website configuration - Set index.html

https://cloud.google.com/sdk/docs/install?hl=de

## Tooling setup

```js
gcloud init
```


https://cloud.google.com/sdk/docs/initializing?hl=de


### Build and Deploy

```
npm run build &&  ./deploy.sh
```

## Edge cases

### District without list

Rahlstedt (Election district 14) - Example street: Travemünder Stieg

### Tree district streets

* Eidelstedter Weg
* Landwehr
* Rahlstedter Weg

### Impossible cases

* Landwehr 6 and 8


# Tech notes

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
