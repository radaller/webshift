# @webshift

### Goals
* Enhance React based SPAs (Single Page Applications) with SSR (server side rendering)
* Enhance frontend micro-services architecture

### Install Dependencies

* [Nodejs](https://nodejs.org/en/download/)

## Quick Start

> ### (Optional) Create a working directory
```bash
mkdir web-fragment && cd ./web-fragment
```

> ### Create @webshift project

```text
npx webshift@latest init

==>

../
├── src/
│   ├── App.js
│   ├── favicon.ico
├── package.json
├── webshift.config.js
```

> ### Start Development
> 
> * Bundles ./src/App.js into memory with **webpack-dev-middleware**
> * Provides Hot Module Replacement with **webpack-hot-middleware**

```bash
npm start
```

> ### Test Quality
> 
> * Executes e2e tests with **selenium-webdriver** and **chromedriver**

```bash
npm run webdriver
```

> ### Build for Production
>
> * Bundles ./src/App.js into the **./build** folder
> * Optimizes artifacts and includes hashes into filenames


```test
npm run build && npm run build:start

==>

../
├── build/
│   ├── analyse/                        <-- bundle details (size, dependencies)
│   ├── public/                         <-- www folder
│   │   ├── img/                            <-- bunle images
│   │   ├── js/                             <-- client scripts
│   │   │   ├── main.js                         <-- main entry
│   │   │   ├── [name].[chunkhash].js           <-- code splitting chunks
│   │   │   ├── vendor.js                       <-- application dependencies
│   ├── server.js                       <-- node express server
│   ├── stats.json                      <-- chunks to assets map
```

### Code Splitting

### Analyzing the Bundle Size

### Advanced Configuration



