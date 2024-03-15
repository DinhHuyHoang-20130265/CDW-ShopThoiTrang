import React, {Fragment, useState} from 'react';
import {Outlet} from "react-router";
import {ToastProvider} from "react-toast-notifications";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";
import PropTypes from "prop-types";
import LayoutUser from "./pages/layout/layoutUser";
import LayoutAdmin from "./pages/layout/layoutAdmin";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <ToastProvider placement="bottom-left">
            <BreadcrumbsProvider>
                <div className="App">
                    <Fragment>
                        {
                            !isAdmin ? <LayoutUser headerContainerClass="container-fluid"
                                                   headerPaddingClass="header-padding-1">
                                <Outlet/>
                            </LayoutUser> : <LayoutAdmin headerContainerClass="container-fluid"
                                                         headerPaddingClass="header-padding-1">
                                <Outlet/>
                            </LayoutAdmin>
                        }
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
