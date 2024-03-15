import {addToWishlist} from "../../store/actions/wishlistActions";
import {connect} from "react-redux";
import {addToCart} from "../../store/actions/cartActions";
import PropTypes from "prop-types";
import {Fragment} from "react";
import ProductGridListSingle from "./ProductGridListSingle";

const ProductGridList = ({
                         products,
                         currency,
                         addToCart,
                         addToWishlist,
                         addToCompare,
                         cartItems,
                         wishlistItems,
                         compareItems,
                         sliderClassName,
                         spaceBottomClass
                     } : any) => {
    return (
        <Fragment>
            {products.map((product : any) => {
                return (
                    <ProductGridListSingle
                        sliderClassName={sliderClassName}
                        spaceBottomClass={spaceBottomClass}
                        product={product}
                        currency={currency}
                        addToCart={addToCart}
                        addToWishlist={addToWishlist}
                        addToCompare={addToCompare}
                        cartItem={
                            cartItems.filter((cartItem : any) => cartItem.id === product.id)[0]
                        }
                        wishlistItem={
                            wishlistItems.filter(
                                (wishlistItem : any) => wishlistItem.id === product.id
                            )[0]
                        }
                        compareItem={
                            compareItems.filter(
                                (compareItem : any) => compareItem.id === product.id
                            )[0]
                        }
                        key={product.id}
                    />
                );
            })}
        </Fragment>
    );
};

ProductGridList.propTypes = {
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

const mapStateToProps = (state : any) => {
    return {
        currency: state.currencyData,
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        compareItems: state.compareData
    };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        addToCart: (
            {item,
            addToast,
            quantityCount,
            selectedProductColor,
            selectedProductSize} : any
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
        addToWishlist: (item :any, addToast: any) => {
            dispatch(addToWishlist(item, addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridList);