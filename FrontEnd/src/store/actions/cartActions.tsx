export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
    item: any,
    addToast: any,
    quantityCount: any,
    selectedProductColor: any,
    selectedProductSize: any
) => {
    return (dispatch: any) => {
        if (addToast) {
            addToast("Thêm sản phẩm vào giỏ hàng thành công", {appearance: "success", autoDismiss: true});
        }
        dispatch({
            type: ADD_TO_CART,
            payload: {
                ...item,
                quantity: quantityCount,
                selectedProductColor: selectedProductColor
                    ? selectedProductColor
                    : item.selectedProductColor
                        ? item.selectedProductColor
                        : null,
                selectedProductSize: selectedProductSize
                    ? selectedProductSize
                    : item.selectedProductSize
                        ? item.selectedProductSize
                        : null
            }
        });
    };
};
//decrease from cart
export const decreaseQuantity = (item: any, addToast: any) => {
    return (dispatch: any) => {
        if (addToast) {
            addToast("Đã tăng số lượng sản phẩm", {
                appearance: "warning",
                autoDismiss: true
            });
        }
        dispatch({type: DECREASE_QUANTITY, payload: item});
    };
};
//delete from cart
export const deleteFromCart = (item: any, addToast: any) => {
    return (dispatch: any) => {
        if (addToast) {
            addToast("Đã xoá sản phẩm", {appearance: "error", autoDismiss: true});
        }
        dispatch({type: DELETE_FROM_CART, payload: item});
    };
};
//delete all from cart
export const deleteAllFromCart = (addToast: any) => {
    return (dispatch: any) => {
        if (addToast) {
            addToast("Đã xoá tất cả sản phẩm trong giỏ hàng", {
                appearance: "error",
                autoDismiss: true
            });
        }
        dispatch({type: DELETE_ALL_FROM_CART});
    };
};

// get stock of cart item
export const cartItemStock = (item: any, color: any, size: any) => {
    return item.variations
        .filter((single: any) => single.color === color)[0]
        .sizes.filter((single: any) => single.size === size)[0].stock;
};
