# @webshift

### Goals
* Enhance React based SPAs (Single Page Applications) with SSR (server side rendering)
* Enhance frontend micro-services architecture

### Install Dependencies

* [Nodejs](https://nodejs.org/en/download/)

## Quick Start
### Create webshift project

```bash
npm init webshift@latest <working-dir>
```

```text
==>

../
├── src/
│   ├── ...
│   ├── App.js
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

### Code Splitting with @loadable
> Split client code for better web performance
>

```javascript
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import loadable from '@loadable/component';

export default (props) => {
    const Welcome = loadable(() => import('./Welcome'));
    const Aboutus = loadable(() => import('./Aboutus'));
    const Error = loadable(() => import('./Error'));
    
    return (
        <Layout>
            <Link to="/">Welcome</Link>
            <Link to="/about">About Us</Link>
            <Switch>
                <Route path={ '/' } component={ Welcome } />
                <Route path={ '/about' } component={ Aboutus } />
                <Route component={ Error } />
            </Switch>
        </Layout>
    );
};
```

### useServerSideEffect()
> Fetching data on the server.
> 
> Fetch library should be universal e.g. axios

```javascript
import axios from 'axios';
import { useServerSideEffect } from 'webshift';

const MyComponent = () => {
    const [data, error] = useServerSideEffect('key', () => {
        return axios.get("https://myapi.example.com").then((res) => res.data);
    }, []);

    return <div>{data.title}</div>;
};
```

### useLogger()
```javascript
import { useLogger } from 'webshift';

const MyComponent = () => {
    const logger = useLogger();
    logger.verbose({message: "[Render]", meta: { component: 'MyComponent'}});

    return <div>Some Text</div>;
};
```

## Features in Progress

### Advanced Build Configuration
>
> Edit **./webshift.config.js** to customise bundle

```javascript
module.exports = {
    common: {
        resolve: {
            alias: {
                '@app': `${ process.cwd() }/src/App.js`,
            },
        },
    },
    client: {
        resolve: {
            alias: {
                '@logger': `${__dirname}/client/logger.js`,
            },
        },
        externals: [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
        ],
    },
    server: {
        resolve: {
            alias: {
                '@render': `${__dirname}/server/render.js`,
                '@core': `${__dirname}/server/core.js`,
                '@document': `${__dirname}/server/document.js`,
                '@logger': `${__dirname}/server/logger.js`,
            },
        },
    }
};
```

### Advanced .env Configuration
```text
# Webserver and assets 
NODE_ENV=[production|development]
HOST=localhost
PORT=3040
PUBLIC_PATH=/main/
BASE_PATH=

# Application logging
LOG_LEVEL=[info|http|verbose|debug]
LOG_TYPE=[json|message]
```

### Bundle Analysis

## Contribution

> * Clone the repository
> * npm install
> * npm run build:init
> * npm run build:copy
> * cd build/
> * npm start or npm run build && npm run build:start
> * npm test