import {
    ADD_TO_CART,
    DECREASE_QUANTITY,
    DELETE_FROM_CART,
    DELETE_ALL_FROM_CART
} from "../actions/cartActions";

const initState: any[] = [];
const {v4: uuidv4} = require('uuid');

const cartReducer = (state = initState, action: any) => {
    const cartItems = state,
        product = action.payload;

    if (action.type === ADD_TO_CART) {
        const cartItem = cartItems.filter(
            item =>
                item.id === product.id &&
                product.selectedProductColor &&
                product.selectedProductColor === item.selectedProductColor &&
                product.selectedProductSize &&
                product.selectedProductSize === item.selectedProductSize &&
                (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        )[0];

        if (cartItem === undefined) {
            return [
                ...cartItems,
                {
                    ...product,
                    quantity: product.quantity ? product.quantity : 1,
                    cartItemId: uuidv4()
                }
            ];
        } else if (
            (cartItem.selectedProductColor !== product.selectedProductColor ||
                cartItem.selectedProductSize !== product.selectedProductSize)
        ) {
            return [
                ...cartItems,
                {
                    ...product,
                    quantity: product.quantity ? product.quantity : 1,
                    cartItemId: uuidv4()
                }
            ];
        } else {
            return cartItems.map(item =>
                item.cartItemId === cartItem.cartItemId
                    ? {
                        ...item,
                        quantity: product.quantity
                            ? item.quantity + product.quantity
                            : item.quantity + 1,
                        selectedProductColor: product.selectedProductColor,
                        selectedProductSize: product.selectedProductSize
                    }
                    : item
            );
        }
    }

    if (action.type === DECREASE_QUANTITY) {
        if (product.quantity === 1) {
            const remainingItems = (cartItems: any, product: any) =>
                cartItems.filter(
                    (cartItem: any) => cartItem.cartItemId !== product.cartItemId
                );
            return remainingItems(cartItems, product);
        } else {
            return cartItems.map(item =>
                item.cartItemId === product.cartItemId
                    ? {...item, quantity: item.quantity - 1}
                    : item
            );
        }
    }

    if (action.type === DELETE_FROM_CART) {
        return cartItems.filter((cartItem: any) =>
            cartItem.cartItemId !== product.cartItemId)

    }

    if (action.type === DELETE_ALL_FROM_CART) {
        return cartItems.filter(() => {
            return false;
        });
    }

    return state;
};

export default cartReducer;
