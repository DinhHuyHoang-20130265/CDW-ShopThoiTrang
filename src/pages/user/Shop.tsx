import React, {Fragment, useEffect, useState} from "react";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import ShopSidebar from "../../components/shop/ShopSidebar";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {connect} from "react-redux";
import {getSortedProducts} from "../../helpers/product";
import ShopTopbar from "../../components/shop/ShopTopbar";
import PropTypes from "prop-types";
import ShopProducts from "../../components/shop/ShopProducts";
// @ts-ignore
import Paginator from "react-hooks-paginator";


const Shop = (params: any) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const pageLimit = 15;

    const getLayout = (layout: any) => {
        setLayout(layout)
    }

    const getSortParams = (sortType: any, sortValue: any) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType: any, sortValue: any) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        let sortedProducts: any = getSortedProducts(params.products, sortType, sortValue);
        sortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, params.products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <Fragment>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/shop'}>Shop</BreadcrumbsItem>

            {/* breadcrumb */}
            <Breadcrumb/>

            {currentData.length > 1 ? <div className="shop-area pt-95 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">
                            {/* shop sidebar */}
                            <ShopSidebar products={params.products} getSortParams={getSortParams}
                                         sideSpaceClass="mr-30"/>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            {/* shop topbar default */}
                            <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams}
                                        productCount={sortedProducts.length} sortedProductCount={currentData.length}/>

                            {/* shop page content default */}
                            <ShopProducts layout={layout} products={currentData}/>

                            {/* shop product pagination */}
                            <div className="pro-pagination-style text-center mt-30">
                                <Paginator
                                    totalRecords={sortedProducts.length}
                                    pageLimit={pageLimit}
                                    pageNeighbours={2}
                                    setOffset={setOffset}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageContainerClass="mb-0 mt-0"
                                    pagePrevText="«"
                                    pageNextText="»"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> : ""}
        </Fragment>
    )
}

Shop.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = (state: any) => {
    return {
        products: state.productData.products
    }
}

export default connect(mapStateToProps)(Shop);
