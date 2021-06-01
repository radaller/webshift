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

### Code Splitting with @webshift
> Wrapping the component with chunk function will 

```javascript
import { chunk } from 'webshift';
import { Route, Switch } from 'react-router';

export default (props) => {
    const homePage = chunk('./components/homePage');
    const aboutPage = chunk('./components/aboutPage');
    const errorPage = chunk('./components/errorPage');
    
    return (
        <Layout>
            <Header/>
            <Switch>
                <Route path={ '/' } component={ homePage } />
                <Route path={ '/about' } component={ aboutPage } />
                <Route component={ errorPage } />
            </Switch>
            <Footer/>
        </Layout>
    );
};
```

### SSR data load

```javascript
import { usePrefetch } from 'webshift';

const MyComponent = () => {
    const [data, error] = usePrefetch(() => {
        return fetch("https://myapi.example.com").then((res) => res.json());
    }, []);

    return <div>{data.title}</div>;
};
```

### Advanced Configuration
>
> Edit **./webshift.config.js** to customise bundle

```javascript
module.exports = {
    FRAGMENT_ID: String,        // default root-fragment
    CLIENT_EXTERNALS: [String], // default [], all dependencies are bundled
    SERVER_EXTERNALS: [String]  // default [], all dependencies are bundled
};
```

### Analyzing the Bundle Size
