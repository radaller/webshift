import React from "react";

import { useContext, useState, useEffect } from "react";

import logger from "@logger";

export const DataContext = React.createContext(false);
export const RequestContext = React.createContext(false);
export const ConfigContext = React.createContext(false);

export const useServerSideEffect = (dataKey, effect, dependencies) => {
    const requestContext = useContext(RequestContext);
    const dataContext = useContext(DataContext);
    const [data, setData] = useState(dataContext[dataKey] || null);
    const [error, setError] = useState(null);

    if (requestContext) {
        requestContext.push(
            effect()
                .then(res => {
                    logger.http(getResponseLogMessage(res));
                    logger.debug(getResponseLogObject(res));
                    return { [dataKey]: res.data };
                })
                .catch((err) => {
                    logger.error();
                    throw err;
                })
        );
    }

    useEffect(() => {
        if (!dataContext[dataKey]) {
            effect()
                .then((res) => {
                    logger.http(getResponseLogMessage(res));
                    logger.debug(getResponseLogObject(res));
                    setData(res.data);
                })
                .catch((error) => {
                    logger.error();
                    setError(error);
                });
        }
        delete dataContext[dataKey];
    }, dependencies);

    return [data, error];
};

const getResponseLogObject = (res) => {
    const { headers } = res;
    return {
        message: `[HttpClient][Request] ${res.config.url}`,
        meta: {
            method: res.config.method.toUpperCase(),
            status: res.status,
            url: res.config.url,
            response: res.data,
        }
    };
};

const getResponseLogMessage = (res) => {
    return {
        message: `[HttpClient] ${res.config.method.toUpperCase()} ${res.status} ${res.config.url}`
    }
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
    const namespace = props.namespace + "__INITIAL_DATA";
    const initialData = JSON.parse(document.getElementById(namespace).textContent);

    return (
        <DataProvider initialData={ initialData }>
            { props.children }
        </DataProvider>
    );
};

export const useConfig = () => {
    const requestContext = useContext(ConfigContext);

};

export const ConfigProvider = (props) => {
    return (
        <ConfigContext.Provider value={ props.config }>
            { props.children }
        </ConfigContext.Provider>
    );
};