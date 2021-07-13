import React from "react";

import { useContext, useState, useEffect } from "react";

import * as logger from "axios-logger";

export const DataContext = React.createContext(false);

export const RequestContext = React.createContext(false);

export const useServerSideEffect = (dataKey, effect, dependencies) => {
    const requestContext = useContext(RequestContext);
    const dataContext = useContext(DataContext);
    const [data, setData] = useState(dataContext[dataKey] || null);
    const [error, setError] = useState(null);

    if (requestContext) {
        requestContext.push(
            effect()
                .then(res => {
                    logger.responseLogger(res);
                    return { [dataKey]: res.data };
                })
                .catch((err) => {
                    logger.errorLogger(err);
                    throw err;
                })
        );
    }

    useEffect(() => {
        if (!dataContext[dataKey]) {
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
        delete dataContext[dataKey];
    }, dependencies);

    return [data, error];
};

export const RequestExtractor = (props) => {
    return (
        <RequestContext.Provider value={ props.requests }>
            { props.children }
        </RequestContext.Provider>
    );
};

export const DataProvider = (props) => {
    const initialData = props.initialData || {};

    return (
        <DataContext.Provider value={ initialData }>
            { props.children }
        </DataContext.Provider>
    );
};

export const BrowserDataProvider = (props) => {
    const namespace = props.namespace || "_initialData";
    const initialData = JSON.parse(document.getElementById(namespace).textContent);

    return (
        <DataProvider initialData={ initialData }>
            { props.children }
        </DataProvider>
    );
};
