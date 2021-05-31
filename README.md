# @webshift

### Goals
* Enhance React based SPAs (Single Page Applications) with SSR (server side rendering)
* 
* Production ready http server
* Load resources on demand

The tool was inspired by missing of running multiple nextjs instances on the same page
https://github.com/vercel/next.js/issues/8963

### Install Dependencies

> * [Nodejs](https://nodejs.org/en/download/)

### Quick Start

> **(Optional) Create a working directory**
```bash
mkdir web-fragment && cd ./web-fragment
```

> **Create @webshift project**

```bash
npx webshift@latest init
```

```text
../
├── src/
│   ├── App.js
│   ├── favicon.ico
│   ├── logo192.ico
│   ├── logo512.ico
├── package.json
├── webshift.config.js
```

> **Start Development**

```bash
npm start
```

> **Test Quality**

```bash
npm test
```


Runs the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

> **Build and Run Production**

```bash 
npm run build && npm run build:start
```

```text
../
├── build/
│   ├── analyse/
│   │   ├── client.html
│   │   ├── server.html
│   ├── public/
│   │   ├── img/
│   │   │   ├── *.(png|svg|jpg|jpeg|gif|ico)
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── [name].[chunkhash].js
│   │   │   ├── vendor.js
│   ├── server.js
│   ├── stats.json
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### Code Splitting

### Analyzing the Bundle Size

### Advanced Configuration



