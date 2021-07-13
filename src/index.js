import React from "react";

import { useContext, useState, useEffect } from "react";

import * as logger from "axios-logger";

export const DataContext = React.createContext({});

export const ServerContext = React.createContext({
    requests: [],
    resolved: false,
});

export const useServerSideEffect = (requestKey, effect, dependencies) => {
    const serverContext = useContext(ServerContext);
    const dataContext = useContext(DataContext);
    const [data, setData] = useState(dataContext[requestKey] || null);

    const [error, setError] = useState(null);

    if (!serverContext.resolved) {
        serverContext.requests.push(
            effect().then(res => (dataContext[requestKey] = res.data))
        );
    }

    useEffect(() => {
        if (!dataContext[requestKey]) {
            console.log(`useEffect requestKey ${requestKey}`);
            effect()
                .then((res) => {
                    logger.responseLogger(res);
                    setData(res.data);
                })
                .catch((error) => {
                    logger.errorLogger(error);
                    setError(error);
                });
        }
        delete dataContext[requestKey];
    }, dependencies);

    return [data, error];
};

export const createServerContext = () => {
    let dataContext = {};
    let serverContext = {
        resolved: false,
        requests: [],
    };
    function ServerDataContext(props) {
        return (
            <ServerContext.Provider value={ serverContext }>
                <DataContext.Provider value={ dataContext }>
                    { props.children }
                </DataContext.Provider>
            </ServerContext.Provider>
        );
    }
    const resolveData = async () => {
        await Promise.all(serverContext.requests);

        serverContext.resolved = true;
        console.log('data resolved', dataContext);

        return {
            data: dataContext,
            toJSON: function () {
                return this.data;
            },
            toHtml: function (variableName= "_initialDataContext") {
                return `<script>window.${ variableName } = ${ JSON.stringify(this) };</script>`;
            },
        };
    };
    return {
        ServerDataContext,
        resolveData
    };
};

export const createBrowserContext = (
    variableName = "_initialDataContext"
) => {

    const initial = window && window[variableName] ? window[variableName] : {};
    let serverContext = {
        resolved: true,
        requests: [],
    };

    function BrowserDataContext(props) {
        return (
            <ServerContext.Provider value={ serverContext }>
                <DataContext.Provider value={ initial }>
                    { props.children }
                </DataContext.Provider>
            </ServerContext.Provider>
        );
    }

    return BrowserDataContext;
};
