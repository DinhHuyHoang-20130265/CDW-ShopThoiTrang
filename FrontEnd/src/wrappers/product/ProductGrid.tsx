import React, {Fragment} from "react";
import {connect} from "react-redux";
import {getProducts} from "../../helpers/product";
import {addToCart} from "../../store/actions/cartActions";
import {addToWishlist} from "../../store/actions/wishlistActions";
import ProductGridItem from "../../components/product/ProductGridItem";

const ProductGrid = ({
                         products,
                         addToCart,
                         addToWishlist,
                         cartItems,
                         wishlistItems,
                         sliderClassName,
                         spaceBottomClass,
                         category,
                         type,
                         limit
                     }: any) => {
    return (
        <>
            {products.map((product: any) => {
                return (
                    <ProductGridItem
                        sliderClassName={sliderClassName}
                        spaceBottomClass={spaceBottomClass}
                        product={product}
                        addToCart={addToCart}
                        addToWishlist={addToWishlist}
                        cartItem={
                            cartItems.filter((cartItem: any) => cartItem.id === product.id)[0]
                        }
                        wishlistItem={
                            wishlistItems.filter(
                                (wishlistItem: any) => wishlistItem.id === product.id
                            )[0]
                        }
                        key={product.id}
                    />
                );
            })}
        </>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        products: getProducts(
            state.productData.products,
            ownProps.category,
            ownProps.type,
            ownProps.limit
        ),
        cartItems: state.cartData,
        wishlistItems: state.wishlistData
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToCart: (
            item: any,
            addToast: any,
            quantityCount: any,
            selectedProductColor: any,
            selectedProductSize: any
        ) => {
            dispatch(
                addToCart(
                    item,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                )
            );
        },
        addToWishlist: (item: any, addToast: any) => {
            dispatch(addToWishlist(item, addToast));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
