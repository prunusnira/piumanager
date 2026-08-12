import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "jotai";

const root = document.getElementById('root')

if (!root) {
    throw new Error('root error')
}

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>);
