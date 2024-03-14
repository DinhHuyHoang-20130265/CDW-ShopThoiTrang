export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (
    item: { selectedProductColor: any; selectedProductSize: any; },
    addToast: (arg0: string, arg1: { appearance: string; autoDismiss: boolean; }) => void,
    quantityCount: any,
    selectedProductColor: any,
    selectedProductSize: any
) => {
    return (dispatch: (arg0: {
        type: string;
        payload: { quantity: any; selectedProductColor: any; selectedProductSize: any; };
    }) => void) => {
        if (addToast) {
            addToast("Added To Cart", {appearance: "success", autoDismiss: true});
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
export const decreaseQuantity = (item: any, addToast: (arg0: string, arg1: {
    appearance: string;
    autoDismiss: boolean;
}) => void) => {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        if (addToast) {
            addToast("Item Decremented From Cart", {
                appearance: "warning",
                autoDismiss: true
            });
        }
        dispatch({type: DECREASE_QUANTITY, payload: item});
    };
};
//delete from cart
export const deleteFromCart = (item: any, addToast: (arg0: string, arg1: {
    appearance: string;
    autoDismiss: boolean;
}) => void) => {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        if (addToast) {
            addToast("Removed From Cart", {appearance: "error", autoDismiss: true});
        }
        dispatch({type: DELETE_FROM_CART, payload: item});
    };
};
//delete all from cart
export const deleteAllFromCart = (addToast: (arg0: string, arg1: {
    appearance: string;
    autoDismiss: boolean;
}) => void) => {
    return (dispatch: (arg0: { type: string; }) => void) => {
        if (addToast) {
            addToast("Removed All From Cart", {
                appearance: "error",
                autoDismiss: true
            });
        }
        dispatch({type: DELETE_ALL_FROM_CART});
    };
};

// get stock of cart item
export const cartItemStock = (item: { stock: any; variation: any[]; }, color: any, size: any) => {
    if (item.stock) {
        return item.stock;
    } else {
        return item.variation
            .filter(single => single.color === color)[0]
            .size.filter((single: { name: any; }) => single.name === size)[0].stock;
    }
};
