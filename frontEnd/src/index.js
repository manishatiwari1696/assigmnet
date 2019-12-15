import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import ReduxToastr from 'react-redux-toastr'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configStore from "./store/configureStore";

const store = configStore();


ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
</Provider>,
    document.getElementById("root"));