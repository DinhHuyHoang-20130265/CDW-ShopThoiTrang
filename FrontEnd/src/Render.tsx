import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {webRouter} from "./router/router";
import React, {useEffect} from "react";
import {applyMiddleware, legacy_createStore} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import {load, save} from "redux-localstorage-simple";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import {fetchProducts} from "./store/actions/productActions";
import axios from "axios";


const Render = () => {
    const store = legacy_createStore(
        rootReducer,
        load(),
        composeWithDevTools(applyMiddleware(thunk, save()))
    );
    const [isLoaded, setIsLoaded] = React.useState(false);
    useEffect(() => {
        const fectch = async () => {
            await axios.get(`http://localhost:8080/api/product/user`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                }
            }).then(response => {
                store.dispatch(fetchProducts(response.data));
                setIsLoaded(true);
            })
        }
        fectch().then();
    }, [store]);

    return (
        isLoaded ?
            <GoogleOAuthProvider clientId={"910519969681-toe1jki11dlo6blotqtm47npbu31t6rd.apps.googleusercontent.com"}>
                <Provider store={store}>
                    <RouterProvider router={webRouter}/>
                </Provider>
            </GoogleOAuthProvider> : <></>
    );
}

export default Render;
