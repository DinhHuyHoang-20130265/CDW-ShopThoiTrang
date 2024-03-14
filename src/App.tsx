import React from 'react';
import {Outlet} from "react-router";
import {ToastProvider} from "react-toast-notifications";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";
import PropTypes from "prop-types";

function App() {
    return (
        <ToastProvider placement="bottom-left">
            <BreadcrumbsProvider>
                <div className="App">
                    <Outlet/>
                </div>
            </BreadcrumbsProvider>
        </ToastProvider>

    );
}

App.propTypes = {
    dispatch: PropTypes.func
};
export default App;
