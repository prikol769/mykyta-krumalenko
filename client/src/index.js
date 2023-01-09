import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './styles/main.scss';
import App from './App';
import {GlobalProvider} from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <App/>
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>
);

