import * as React from 'react';
import {Admin, Login, Resource} from 'react-admin';
import {dataProvider} from "./dataProvider/dataProvider";
import UserList from "./users/UserList";
import {authProvider} from "./authProvider";
import ProductList from "./products/ProductList";
import {ProductShow} from "./products/ProductShow";
import CategoryList from "./categories/CategoryList";

const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            loginPage={Login}
            title="Admin"
            dataProvider={dataProvider}
            disableTelemetry
        >
            <Resource name="user" list={UserList}/>
            <Resource name="product" list={ProductList} show={ProductShow}/>
            <Resource name={"category"} list={CategoryList}/>
        </Admin>
    );
};

export default App;
