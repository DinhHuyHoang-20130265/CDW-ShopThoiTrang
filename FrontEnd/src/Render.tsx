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
import toast from "react-hot-toast";


const Render = () => {

    axios.interceptors.response.use(
        response => {
            return response
        },
        async function (error) {
            const originalRequest = error.config
            if (error.response.status === 400 && originalRequest._retry) {
                toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!")
                localStorage.removeItem('user');
                window.location.href = "/login-register"
                return Promise.reject(error)
            }

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const res = await axios
                    .post(`${process.env.REACT_APP_API_ENDPOINT}auth/refresh-token`,
                        {}, {
                            headers: {
                                Accept: 'application/json',
                                "Content-Type": "application/json",
                            },
                            withCredentials: true
                        });
                if (res.status === 200)
                    return axios(originalRequest);
            }
            toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau! :" + error)
            return Promise.reject(error)
        }
    );
    const store = legacy_createStore(
        rootReducer,
        load(),
        composeWithDevTools(applyMiddleware(thunk, save()))
    );
    const [isLoaded, setIsLoaded] = React.useState(false);
    useEffect(() => {
        const fectch = async () => {
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}product/user`, {
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
            <GoogleOAuthProvider
                // @ts-ignore
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_API_CLIENT}>
                <Provider store={store}>
                    <RouterProvider router={webRouter}/>
                </Provider>
            </GoogleOAuthProvider> : <></>
    );
}

export default Render;
