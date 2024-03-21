import {
    ADD_TO_WISHLIST,
    DELETE_FROM_WISHLIST,
    DELETE_ALL_FROM_WISHLIST
} from "../actions/wishlistActions";

const initState: any = [];

const wishlistReducer = (state = initState, action: { payload: any; type: string; }) => {
    const wishlistItems = state,
        product = action.payload;

    if (action.type === ADD_TO_WISHLIST) {
        const wishlistItem = wishlistItems.filter(
            (item: any) => item.id === product.id
        )[0];
        if (wishlistItem === undefined) {
            return [...wishlistItems, product];
        } else {
            return wishlistItems;
        }
    }

    if (action.type === DELETE_FROM_WISHLIST) {
        const remainingItems = (wishlistItems: any[], product: { id: any; }) =>
            wishlistItems.filter(wishlistItem => wishlistItem.id !== product.id);
        return remainingItems(wishlistItems, product);
    }

    if (action.type === DELETE_ALL_FROM_WISHLIST) {
        return wishlistItems.filter(() => {
            return false;
        });
    }

    return wishlistItems;
};

export default wishlistReducer;
