import ReactDOM from 'react-dom';
import App from 'webshift/app';

ReactDOM.hydrate(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById(FRAGMENT_ID)
);
