import React, {Fragment, useEffect, useState} from "react";
import ShopSidebar from "../../components/shop/ShopSidebar";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {getSortedProducts} from "../../helpers/product";
import ShopTopbar from "../../components/shop/ShopTopbar";
import ShopProducts from "../../components/shop/ShopProducts";
import {connect} from "react-redux";
// @ts-ignore
import Paginator from "react-hooks-paginator";
import {animateScroll} from "react-scroll";

const Shop = ({products}: any) => {
    const [layout, setLayout] = useState('grid three-column');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [orderBy, setOrderBy] = useState('default');
    const pageLimit = 15;

    const getLayout = (layout: any) => {
        setLayout(layout)
    }

    useEffect(() => {
        let sortedProducts: any = products.filter((product: any) => product.name.toLowerCase().includes(searchValue.toLowerCase()));
        sortedProducts = getSortedProducts(sortedProducts, colors, sizes, categories, searchValue, orderBy);
        setSortedProducts(sortedProducts ? sortedProducts : products);
        setCurrentData(sortedProducts ? sortedProducts.slice(offset, offset + pageLimit) : products);
    }, [offset, products, colors, sizes, categories, orderBy, searchValue]);
    useEffect(() => {
        animateScroll.scrollToTop();
    }, [currentPage]);

    return (
        <Fragment>
            <Breadcrumb/>

            <div className="shop-area pt-95 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">

                            <ShopSidebar products={products} setColors={setColors} setSizes={setSizes} sizes={sizes}
                                         colors={colors} categories={categories}
                                         setCategories={setCategories}
                                         setSearchValue={setSearchValue}
                                         sideSpaceClass="mr-30"/>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
                            <ShopTopbar getLayout={getLayout} setOrderBy={setOrderBy}
                                        productCount={sortedProducts.length} sortedProductCount={currentData.length}/>

                            <ShopProducts layout={layout} products={currentData}/>

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
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        products: state.productData.products
    }
}
export default connect(mapStateToProps)(Shop)
