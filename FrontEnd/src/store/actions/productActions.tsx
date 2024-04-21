export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products: any) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

// fetch products
export const fetchProducts = (products: any) => {
    return (dispatch: any) => {
        dispatch(fetchProductsSuccess(products));
    };
};
