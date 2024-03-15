import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {connect} from "react-redux";
import ProductGridForShopItem from "../../components/product/ProductGridForShopItem";
import {addToCart} from "../../store/actions/cartActions";
import {addToWishlist} from "../../store/actions/wishlistActions";

const ProductGridForShop = ({
                                products,
                                addToCart,
                                addToWishlist,
                                cartItems,
                                wishlistItems,
                                sliderClassName,
                                spaceBottomClass
                            }: any) => {
    return (
        <Fragment>
            {products.map((product: any) => {
                return (
                    <ProductGridForShopItem
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
        </Fragment>
    );
};

ProductGridForShop.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItems: PropTypes.array,
    compareItems: PropTypes.array,
    currency: PropTypes.object,
    products: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItems: PropTypes.array
};

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridForShop);
