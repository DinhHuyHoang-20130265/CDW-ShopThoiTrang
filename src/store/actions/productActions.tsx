export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products: any) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products
export const fetchProducts = (products: ({ id: string; sku: string; name: string; price: number; discount: number; offerEnd: string; new: boolean; rating: number; saleCount: number; category: string[]; tag: string[]; variation: { color: string; image: string; size: { name: string; stock: number; }[]; }[]; image: string[]; shortDescription: string; fullDescription: string; stock?: undefined; affiliateLink?: undefined; } | { id: string; sku: string; name: string; price: number; discount: number; new: boolean; rating: number; saleCount: number; category: string[]; tag: string[]; variation: { color: string; image: string; size: { name: string; stock: number; }[]; }[]; image: string[]; shortDescription: string; fullDescription: string; offerEnd?: undefined; stock?: undefined; affiliateLink?: undefined; } | { id: string; sku: string; name: string; price: number; discount: number; offerEnd: string; new: boolean; rating: number; saleCount: number; category: string[]; tag: string[]; stock: number; image: string[]; shortDescription: string; fullDescription: string; variation?: undefined; affiliateLink?: undefined; } | { id: string; sku: string; name: string; price: number; discount: number; new: boolean; rating: number; saleCount: number; category: string[]; tag: string[]; stock: number; affiliateLink: string; image: string[]; shortDescription: string; fullDescription: string; offerEnd?: undefined; variation?: undefined; } | { id: string; sku: string; name: string; price: number; discount: number; new: boolean; rating: number; saleCount: number; category: string[]; tag: string[]; stock: number; image: string[]; shortDescription: string; fullDescription: string; offerEnd?: undefined; variation?: undefined; affiliateLink?: undefined; })[]) => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch(fetchProductsSuccess(products));
  };
};
