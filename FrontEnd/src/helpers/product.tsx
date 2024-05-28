// get products
export const getProducts = (products: any[], category: any, type: string, limit: any) => {
    const finalProducts = category
        ? products.filter(
            product => product.categories.filter((single: any) => single === category)[0]
        )
        : products;
    if (type && type === "new") {
        const newProducts = finalProducts.sort((a, b) => {
            return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        });
        return newProducts.slice(0, limit ? limit : newProducts.length);
    } else if (type && type === "saleItems") {
        const saleItems = finalProducts.filter(product => product.promotions.length > 0);
        return saleItems.slice(0, limit ? limit : saleItems.length);
    }
    return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price: any, promotion: any) => {
    return promotion !== null && promotion !== undefined && promotion.discount > 0 ? price - price * (promotion.discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems: any[], product: any, color: any, size: any) => {
    let productInCart = cartItems.filter(
        single =>
            single.id === product.id &&
            (single.selectedProductColor
                ? single.selectedProductColor === color
                : true) &&
            (single.selectedProductSize ? single.selectedProductSize === size : true)
    )[0];
    if (cartItems.length >= 1 && productInCart) {
        if (product.variations) {
            return cartItems.filter(
                single =>
                    single.id === product.id &&
                    single.selectedProductColor === color &&
                    single.selectedProductSize === size
            )[0].quantity;
        } else {
            return cartItems.filter(single => product.id === single.id)[0].quantity;
        }
    } else {
        return 0;
    }
};

//get products based on category
export const getSortedProducts = (products: any[], sortType: string, sortValue: string) => {
    console.log(products, sortType, sortValue)
    if (products && sortType && sortValue) {
        if (sortType === "category") {
            return products.filter(
                product => product.categories.filter((single: any) => single.name === sortValue)[0]
            );
        }
        if (sortType === "color") {
            return products.filter(
                product =>
                    product.variations &&
                    product.variations.filter((single: any) => single.color === sortValue)[0]
            );
        }
        if (sortType === "size") {
            return products.filter(
                product =>
                    product.variations &&
                    product.variations.filter(
                        (single: any) => single.sizes.filter((single: any) => single.size === sortValue)[0]
                    )[0]
            );
        }
        if (sortType === "filterSort") {
            let sortProducts = [...products];
            if (sortValue === "default") {
                return sortProducts;
            }
            if (sortValue === "priceHighToLow") {
                return sortProducts.sort((a, b) => {
                    return b.price.price - a.price.price;
                });
            }
            if (sortValue === "priceLowToHigh") {
                return sortProducts.sort((a, b) => {
                    return a.price.price - b.price.price;
                });
            }
        }
    }
    return products;
};

// get individual element
const getIndividualItemArray = (array: any[]) => {
    return array.filter(function (v, i, self) {
        return i === self.indexOf(v);
    });
};

// get individual categories
export const getIndividualCategories = (products: any[]) => {
    let productCategories: any[] = [];
    products &&
    products.map(product => {
        return (
            product.categories &&
            product.categories.map((single: any) => {
                if (productCategories.find(item => item.id === single.id) === undefined)
                    return productCategories.push(single);
                return null;
            })
        );
    });
    return getIndividualItemArray(productCategories);
};

// get individual colors
export const getIndividualColors = (products: any[]) => {
    let productColors: any[] = [];
    products &&
    products.map(product => {
        return (
            product.variations &&
            product.variations.map((single: any) => {
                if (productColors.find(item => item.color === single.color) === undefined)
                    return productColors.push(single.color);
                return null;
            })
        );
    });
    return getIndividualItemArray(productColors);
};

// get individual sizes
export const getProductsIndividualSizes = (products: any[]) => {
    let productSizes: any[] = [];
    products &&
    products.map(product => {
        return (
            product.variations &&
            product.variations.map((single: any) => {
                return single.sizes.map((single: any) => {
                    if (productSizes.find(item => item.size === single.size) === undefined)
                        return productSizes.push(single.size);
                    return null;
                });
            })
        );
    });
    return getIndividualItemArray(productSizes);
};


export const setActiveSort = (e: any) => {
    const filterButtons = document.querySelectorAll(
        ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
    );
    filterButtons.forEach(item => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e: any) => {
    const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
    gridSwitchBtn.forEach(item => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e: any) => {
    const shopTopFilterWrapper: any = document.querySelector(
        "#product-filter-wrapper"
    );
    shopTopFilterWrapper.classList.toggle("active");
    if (shopTopFilterWrapper.style.height) {
        shopTopFilterWrapper.style.height = null;
    } else {
        shopTopFilterWrapper.style.height =
            shopTopFilterWrapper.scrollHeight + "px";
    }
    e.currentTarget.classList.toggle("active");
};
