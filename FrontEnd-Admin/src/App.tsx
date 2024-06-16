import * as React from 'react';
import {
    Admin,
    AppBar,
    CustomRoutes,
    Layout,
    Login,
    Resource,
    houseLightTheme,
    radiantLightTheme,
    usePermissions
} from 'react-admin';
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
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
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
import DiscountRoundedIcon from '@mui/icons-material/DiscountRounded';
import ProductShow from "./products/ProductShow";
import OrderList from "./orders/OrderList";
import OrderEdit from "./orders/OrderEdit";
import PromotionList from "./promotion/PromotionList";
import PromotionEdit from "./promotion/PromotionEdit";
import PromotionCreate from "./promotion/PromotionCreate";
import ReviewList from "./reviews/ReviewList";
import DashBoard from "./Dashboard/DashBoard";
import {LayoutCustom} from "./Layout/LayoutCustom";
import {Route} from 'react-router-dom';
import {ProfileEdit, ProfileProvider} from "./profile/profile";
import CouponList from "./coupons/CouponList";
import CouponEdit from "./coupons/CouponEdit";
import CouponCreate from "./coupons/CouponCreate";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {useEffect} from "react";

const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            loginPage={Login}
            title="Admin"
            layout={LayoutCustom}
            dataProvider={dataProvider}
            theme={radiantLightTheme}
            disableTelemetry
            dashboard={DashBoard}
        >
            <CustomRoutes>
                <Route path="/profile/*" element={<ProfileProvider>
                    <ProfileEdit/></ProfileProvider>}/>
            </CustomRoutes>
            <Resource name="user"
                      list={UserList}
                      edit={UserEdit}
                      create={UserCreate}
                      icon={UserIcon}
                      options={{label: "Tài Khoản"}}
                      hasShow={false}
            />
            <Resource name="coupon"
                      list={CouponList}
                      edit={CouponEdit}
                      create={CouponCreate}
                      icon={LocalOfferIcon}
                      options={{label: "Mã giảm giá"}}
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
            <Resource name="promotion"
                      list={PromotionList}
                      edit={PromotionEdit}
                      create={PromotionCreate}
                      icon={DiscountRoundedIcon}
                      recordRepresentation={(promotion) => promotion.name}
                      options={{label: "Khuyến mãi"}}
            />

            <Resource name="import-invoice"
                      list={ImportInvoiceList}
                      create={ImportInvoiceCreate}
                      icon={ArrowDownwardRoundedIcon}
                      options={{label: "Nhập hàng"}}
            />
            <Resource name={"order"}
                      list={OrderList}
                      edit={OrderEdit}
                      hasCreate={false}
                      icon={ReceiptRoundedIcon}
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
                      hasShow={false}
                      icon={NewspaperRoundedIcon}
                      options={{label: "Bài viết"}}
            />
            <Resource name={"review"}
                      list={ReviewList}
                      icon={CommentRoundedIcon}
                      options={{label: "Đánh giá"}}
            />
        </Admin>
    );
};

export default App;
