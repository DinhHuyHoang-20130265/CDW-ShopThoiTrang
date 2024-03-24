import React, {Fragment, useEffect, useState} from 'react';
import {Outlet} from "react-router";
import {ToastProvider} from "react-toast-notifications";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";
import PropTypes from "prop-types";
import LayoutUser from "./pages/layout/layoutUser";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // @ts-ignore
        const user: any = JSON.parse(localStorage.getItem('user'));
        if (user && user.authorities.includes('ROLE_ADMIN')) {
            setIsAdmin(true);
        }
    }, []);

    return (
        <ToastProvider placement="bottom-left">
            <BreadcrumbsProvider>
                <div className="App">
                    <Fragment>
                        <LayoutUser headerContainerClass="container-fluid"
                                    headerPaddingClass="header-padding-1">
                            <Outlet/>
                        </LayoutUser>
                    </Fragment>
                </div>
            </BreadcrumbsProvider>
        </ToastProvider>

    );
}

App.propTypes = {
    dispatch: PropTypes.func
};
export default App;
