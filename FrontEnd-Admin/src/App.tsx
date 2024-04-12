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
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import {ProductCreate} from "./products/ProductCreate";
import {CategoryEdit} from "./categories/CategoryEdit";
import {CategoryCreate} from "./categories/CategoryCreate";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import BlogList from "./blogs/BlogList";
import {BlogEdit} from "./blogs/BlogEdit";
import {BlogCreate} from "./blogs/BlogCreate";
import ImportInvoiceList from "./importInvoices/ImportInvoiceList";
import ImportInvoiceCreate from "./importInvoices/ImportInvoiceCreate";
import ProductShow from "./products/ProductShow";
import OrderList from "./orders/OrderList";

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
                      edit={UserEdit}
                      create={UserCreate}
                      icon={UserIcon}
                      options={{label: "Tài Khoản"}}
                      hasShow={false}
            />
            <Resource name="product"
                      list={ProductList}
                      edit={ProductEdit}
                      create={ProductCreate}
                      show={ProductShow}
                      icon={ProductIcon}
                      recordRepresentation={(product) => product.name}
                      options={{label: "Sản Phẩm"}}
            />
            <Resource name="import-invoice"
                      list={ImportInvoiceList}
                      create={ImportInvoiceCreate}
                      icon={ArrowDownwardRoundedIcon}
                      options={{label: "Nhập hàng"}}
            />
            <Resource name={"order"}
                      list={OrderList}
                      icon={ArrowDownwardRoundedIcon}
                      options={{label: "Đơn hàng"}}
                      
            />
            <Resource name="category"
                      list={CategoryList}
                      edit={CategoryEdit}
                      create={CategoryCreate}
                      icon={CategoryIcon}
                      options={{label: "Danh mục"}}
            />
            <Resource name="blog"
                      list={BlogList}
                      edit={BlogEdit}
                      create={BlogCreate}
                      icon={NewspaperRoundedIcon}
                      options={{label: "Bài viết"}}
            />
        </Admin>
    );
};

export default App;
