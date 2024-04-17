import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {webRouter} from "./router/router";
import {Provider} from "react-redux";
import {thunk} from "redux-thunk";
import {save, load} from "redux-localstorage-simple";

import {fetchProducts} from "./store/actions/productActions";
import {applyMiddleware, legacy_createStore} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import products from "./data_sample/products";
import "./assets/scss/style.scss";
import {GoogleOAuthProvider} from "@react-oauth/google";

const store = legacy_createStore(
    rootReducer,
    load(),
    composeWithDevTools(applyMiddleware(thunk, save()))
);

store.dispatch(fetchProducts(products));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId={"910519969681-toe1jki11dlo6blotqtm47npbu31t6rd.apps.googleusercontent.com"}>
        <Provider store={store}>
            <RouterProvider router={webRouter}/>
        </Provider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
