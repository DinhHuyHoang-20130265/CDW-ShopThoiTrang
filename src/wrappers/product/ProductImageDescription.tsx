import {useToasts} from "react-toast-notifications";
import {getDiscountPrice} from "../../helpers/product";
import React from "react";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const ProductImageDescription = ({
                                     spaceTopClass,
                                     spaceBottomClass,
                                     galleryType,
                                     product,
                                     cartItems,
                                     wishlistItems
                                 } : any) => {
    const wishlistItem = wishlistItems.filter(
        (wishlistItem : any) => wishlistItem.id === product.id
    )[0];
    const { addToast } = useToasts();

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
                        {/* product image gallery */}
                        {galleryType === "leftThumb" ? (
                            <ProductImageGallerySideThumb
                                product={product}
                                thumbPosition="left"
                            />
                        ) : galleryType === "rightThumb" ? (
                            <ProductImageGallerySideThumb product={product} />
                        ) : galleryType === "fixedImage" ? (
                            <ProductImageFixed product={product} />
                        ) : (
                            <ProductImageGallery product={product} />
                        )}
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

ProductImageDescription.propTypes = {
    cartItems: PropTypes.array,
    compareItems: PropTypes.array,
    currency: PropTypes.object,
    galleryType: PropTypes.string,
    product: PropTypes.object,
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
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

export default connect(mapStateToProps)(ProductImageDescription);
