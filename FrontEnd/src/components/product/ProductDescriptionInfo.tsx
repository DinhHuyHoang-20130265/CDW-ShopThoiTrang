import {Fragment, useState} from "react";
import {formatCurrency, getProductCartQuantity} from "../../helpers/product";
import ProductRating from "../../wrappers/product/sub-components/ProductRating";
import {Link} from "react-router-dom";
import {addToCart} from "../../store/actions/cartActions";
import {addToWishlist} from "../../store/actions/wishlistActions";
import {connect} from "react-redux";

const ProductDescriptionInfo = ({
                                    product,
                                    discountedPrice,
                                    finalDiscountedPrice,
                                    finalProductPrice,
                                    cartItems,
                                    wishlistItem,
                                    addToast,
                                    addToCart,
                                    addToWishlist,
                                    reviews
                                }: any) => {
    const [selectedProductColor, setSelectedProductColor] = useState(
        product.variations ? product.variations[0].color : ""
    );
    const [selectedProductSize, setSelectedProductSize] = useState(
        product.variations ? product.variations[0].sizes[0].size : ""
    );
    const [productStock, setProductStock] = useState(
        product.variations ? product.variations[0].sizes[0].stock : product.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const productCartQty = getProductCartQuantity(
        cartItems,
        product,
        selectedProductColor,
        selectedProductSize
    );
    return (
        <div className="product-details-content ml-70">
            <h2>{product.name}</h2>
            <div className="product-details-price">
                {discountedPrice !== null ? (
                    <Fragment>
                        <span>{formatCurrency(finalDiscountedPrice)}</span>{" "}
                        <span className="old">
              {formatCurrency(finalProductPrice)}
            </span>
                    </Fragment>
                ) : (
                    <span>{formatCurrency(finalProductPrice)} </span>
                )}
            </div>
            <div className="pro-details-rating-wrap">
                <div className="pro-details-rating">
                    <ProductRating reviews={reviews}/>
                </div>
            </div>
            <div className="pro-details-list">
                <p>{product.description}</p>
            </div>

            {product.variations ? (
                <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                        <span>Màu sắc</span>
                        <div className="pro-details-color-content">
                            {product.variations.map((single: any, key: any) => {
                                return (
                                    <label
                                        className={`pro-details-color-content--single ${single.color}`}
                                        key={key}
                                    >
                                        <input
                                            type="radio"
                                            value={single.color}
                                            name="product-color"
                                            checked={(single.color === selectedProductColor ? "checked" : "") as any}
                                            onChange={() => {
                                                setSelectedProductColor(single.color);
                                                setSelectedProductSize(single.sizes[0].size);
                                                setProductStock(single.sizes[0].stock);
                                                setQuantityCount(1);
                                            }}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pro-details-size">
                        <span>Kích thước</span>
                        <div className="pro-details-size-content">
                            {product.variations &&
                                product.variations.map((single: any) => {
                                    return single.color === selectedProductColor
                                        ? single.sizes.map((singleSize: any, key: any) => {
                                            return (
                                                <label
                                                    className={`pro-details-size-content--single`}
                                                    key={key}
                                                >
                                                    <input
                                                        type="radio"
                                                        value={singleSize.size}
                                                        checked={
                                                            (singleSize.size === selectedProductSize
                                                                ? "checked"
                                                                : "") as any
                                                        }
                                                        onChange={() => {
                                                            setSelectedProductSize(singleSize.size);
                                                            setProductStock(singleSize.stock);
                                                            setQuantityCount(1);
                                                        }}
                                                    />
                                                    <span className="size-name">{singleSize.size}</span>
                                                </label>
                                            );
                                        })
                                        : "";
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="pro-details-quality">
                <div className="cart-plus-minus">
                    <button
                        onClick={() =>
                            setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                        }
                        className="dec qtybutton"
                    >
                        -
                    </button>
                    <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                    />
                    <button
                        onClick={() =>
                            setQuantityCount(
                                quantityCount < productStock - productCartQty
                                    ? quantityCount + 1
                                    : quantityCount
                            )
                        }
                        className="inc qtybutton"
                    >
                        +
                    </button>
                </div>
                <div className="pro-details-cart btn-hover">
                    {productStock && productStock > 0 ? (
                        <button
                            onClick={() =>
                                addToCart(
                                    product,
                                    addToast,
                                    quantityCount,
                                    selectedProductColor,
                                    selectedProductSize
                                )
                            }
                            disabled={productCartQty >= productStock}
                        >
                            {" "}
                            Thêm vào giỏ hàng{" "}
                        </button>
                    ) : (
                        <button disabled>Hết hàng</button>
                    )}
                </div>
                <div className="pro-details-wishlist">
                    <button
                        className={wishlistItem !== undefined ? "active" : ""}
                        disabled={wishlistItem !== undefined}
                        title={
                            wishlistItem !== undefined
                                ? "Added to wishlist"
                                : "Add to wishlist"
                        }
                        onClick={() => addToWishlist(product, addToast)}
                    >
                        <i className="pe-7s-like"/>
                    </button>
                </div>
            </div>
            {product.categories ? (
                <div className="pro-details-meta">
                    <span>Danh mục :</span>
                    <ul>
                        {product.categories.map((single: any, key: any) => {
                            return (
                                <li key={key}>
                                    <a>
                                        {single.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                ""
            )}


            <div className="pro-details-social">
                <ul>
                    <li>
                        <a href="//facebook.com">
                            <i className="fa fa-facebook"/>
                        </a>
                    </li>
                    <li>
                        <a href="//dribbble.com">
                            <i className="fa fa-dribbble"/>
                        </a>
                    </li>
                    <li>
                        <a href="//pinterest.com">
                            <i className="fa fa-pinterest-p"/>
                        </a>
                    </li>
                    <li>
                        <a href="//twitter.com">
                            <i className="fa fa-twitter"/>
                        </a>
                    </li>
                    <li>
                        <a href="//linkedin.com">
                            <i className="fa fa-linkedin"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToCart: (
            item: any,
            addToast: any,
            quantityCount: any,
            selectedProductColor: any,
            selectedProductSize
                : any
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

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
