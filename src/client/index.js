import { StrictMode } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from '@app';

import { BrowserDataProvider } from 'webshift';

const BASE_PATH = document.getElementById(`${FRAGMENT_ID}__BASE_PATH`).textContent;
const LOADABLE_NAMESPACE = FRAGMENT_ID;
const ROOT_ELEMENT_ID = FRAGMENT_ID;

loadableReady(
    () => {
        hydrate(
            <StrictMode>
                <BrowserDataProvider namespace={ LOADABLE_NAMESPACE }>
                    <BrowserRouter basename={ BASE_PATH }>
                        <App />
                    </BrowserRouter>
                </BrowserDataProvider>
            </StrictMode>,
            document.getElementById(ROOT_ELEMENT_ID)
        );
    },
    { namespace: LOADABLE_NAMESPACE }
);

// if (module['hot']) {
//     module['hot'].accept();
// }
