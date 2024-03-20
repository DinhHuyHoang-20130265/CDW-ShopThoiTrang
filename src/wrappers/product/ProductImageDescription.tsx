import {useToasts} from "react-toast-notifications";
import {getDiscountPrice} from "../../helpers/product";
import React from "react";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import {connect} from "react-redux";

const ProductImageDescription = ({spaceTopClass, spaceBottomClass, product, cartItems, wishlistItems,}: any) => {

    const wishlistItem = wishlistItems.filter(
        (wishlistItem: any) => wishlistItem.id === product.id
    )[0];
    const {addToast} = useToasts();

    const discountedPrice = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = +(product.price).toFixed(2);
    const finalDiscountedPrice = +(
        discountedPrice !== null ? discountedPrice : product.price
    ).toFixed(2);

    return (
        <div
            className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
            }`}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <ProductImageGallerySideThumb
                            product={product}
                            thumbPosition="left"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {/* product description info */}
                        <ProductDescriptionInfo
                            product={product}
                            discountedPrice={discountedPrice}
                            finalDiscountedPrice={finalDiscountedPrice}
                            finalProductPrice={finalProductPrice}
                            cartItems={cartItems}
                            wishlistItem={wishlistItem}
                            addToast={addToast}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
    };
};

export default connect(mapStateToProps)(ProductImageDescription);
