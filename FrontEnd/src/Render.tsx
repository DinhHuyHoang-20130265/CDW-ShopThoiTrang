import {googleLogout, GoogleOAuthProvider} from "@react-oauth/google";
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
import {logout} from "./components/auth/Logout";


const Render = () => {
    let retryCount = 0;

    const handleLogout = () => {
        googleLogout();
        logout();
        toast.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!");
        localStorage.removeItem('user');
        window.location.href = "/login-register";
    };

    axios.interceptors.response.use(
        response => response,
        async (error) => {
            const originalRequest = error.config;

            if (!originalRequest) {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
                return Promise.reject(error);
            }

            if (error.response) {
                const {status} = error.response;

                if (status === 400 && originalRequest._retry) {
                    retryCount = 0;
                    handleLogout();
                    return Promise.reject(error);
                }

                if ((status === 401 || (status === 403 && error.response.data !== "")) && !originalRequest._retry) {
                    originalRequest._retry = true;
                    if (retryCount >= 1) {
                        retryCount = 0;
                        handleLogout();
                        return Promise.reject(error);
                    }

                    retryCount++;

                    try {
                        const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/refresh-token`, {}, {
                            headers: {
                                Accept: 'application/json',
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        });

                        if (res.status === 200) {
                            retryCount = 0;
                            return axios(originalRequest);
                        } else {
                            retryCount = 0;
                            handleLogout();
                        }
                    } catch (error) {
                        retryCount = 0;
                        handleLogout();
                    }
                } else if (status === 406) {
                    toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
                } else if (status === 403 && error.response.data !== "") {
                    toast.error("Unauthorized:" + error);
                } else if (status === 403 && error.response.data == "") {
                    toast.error("Đã có lỗi xảy ra hoặc tài khoản của bạn không có quyền truy cập!");
                    window.location.href = "/login-register";
                }
            } else {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
            }

            return Promise.reject(error);
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
                },
                withCredentials: true,
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
