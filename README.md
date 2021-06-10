# @webshift

### Goals
* Enhance React based SPAs (Single Page Applications) with SSR (server side rendering)
* Enhance frontend micro-services architecture

### Install Dependencies

* [Nodejs](https://nodejs.org/en/download/)

## Quick Start

> (Optional) Create a working directory
```bash
mkdir web-fragment && cd ./web-fragment
```

### Create @webshift project

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

### Start Development
> 
> * Bundles ./src/App.js into memory with **webpack-dev-middleware**
> * Provides Hot Module Replacement with **webpack-hot-middleware**

```bash
npm start
```

### Run Tests
> 
> * Executes e2e tests with **selenium-webdriver** and **chromedriver**

```bash
npm run webdriver
```

### Production Build
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

### Splitting code with @loadable
> Split client code for better web performance
>

```javascript
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

export default (props) => {
    const Home = loadable(() => import('./Home'));
    const Aboutus = loadable(() => import('./Aboutus'));
    const Error = loadable(() => import('./Error'));
    
    return (
        <Layout>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Switch>
                <Route path={ '/' } component={ Home } />
                <Route path={ '/about' } component={ Aboutus } />
                <Route component={ Error } />
            </Switch>
        </Layout>
    );
};
```

### useServerSideEffect()
> Fetching data on the server. 

```javascript
import { useServerSideEffect } from '@webshift';

const MyComponent = () => {
    const [data, error] = useServerSideEffect(() => {
        return fetch("https://myapi.example.com").then((res) => res.json());
    }, []);

    return <div>{data.title}</div>;
};
```

### Advanced Build Configuration
>
> Edit **./webshift.config.js** to customise bundle

```javascript
module.exports = {
    CLIENT_EXTERNALS: [String], // default [], all dependencies are bundled
    SERVER_EXTERNALS: [String]  // default [], all dependencies are bundled
};
```

### Advanced .env Configuration
```text
APP_SERVER_HOST=localhost
APP_SERVER_PORT=3040
HTML_ID=root-fragment
PUBLIC_PATH=/
LOG_COLOR=true
LOG_LEVEL=info
```

### Analyzing the Bundle Size

## Contribution

> * Clone the repository
> * npm install
> * npm run build:init
> * npm run build:copy
> * cd build/
> * npm start or npm run build