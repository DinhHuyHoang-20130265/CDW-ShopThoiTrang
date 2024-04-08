import * as React from 'react';
import {Admin, Login, Resource} from 'react-admin';
import {dataProvider} from "./dataProvider/dataProvider";
import UserList from "./users/UserList";
import {authProvider} from "./authProvider";
import ProductList from "./products/ProductList";
import {ProductEdit} from "./products/ProductEdit";
import CategoryList from "./categories/CategoryList";
import ProductIcon from '@mui/icons-material/CheckroomRounded';
import UserIcon from '@mui/icons-material/PeopleAltRounded';
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import {ProductCreate} from "./products/ProductCreate";
import {CategoryEdit} from "./categories/CategoryEdit";
import {CategoryCreate} from "./categories/CategoryCreate";
const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            loginPage={Login}
            title="Admin"
            dataProvider={dataProvider}
            disableTelemetry
        >
            <Resource name="user"
                      list={UserList}
                      icon={UserIcon}
                      options={{label: "Tài Khoản"}}
            />
            <Resource name="product"
                      list={ProductList}
                      edit={ProductEdit}
                      create={ProductCreate}
                      icon={ProductIcon}
                      recordRepresentation={(product) => product.name}
                      options={{label: "Sản Phẩm"}}
            />
            <Resource name="category"
                      list={CategoryList}
                      edit={CategoryEdit}
                      create={CategoryCreate}
                      icon={CategoryIcon}
                      options={{label: "Danh mục"}}
            />
        </Admin>
    );
};

export default App;
