import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from "recoil";

const root = document.getElementById('root')

if (!root) {
    throw new Error('root error')
}

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
