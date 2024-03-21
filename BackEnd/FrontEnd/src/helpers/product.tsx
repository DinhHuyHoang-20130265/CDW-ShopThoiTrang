// get products
export const getProducts = (products: any[], category: any, type: string, limit: any) => {
    const finalProducts = category
        ? products.filter(
            product => product.category.filter((single: any) => single === category)[0]
        )
        : products;

    if (type && type === "new") {
        const newProducts = finalProducts.filter(single => single.new);
        return newProducts.slice(0, limit ? limit : newProducts.length);
    }
    if (type && type === "bestSeller") {
        return finalProducts
            .sort((a, b) => {
                return b.saleCount - a.saleCount;
            })
            .slice(0, limit ? limit : finalProducts.length);
    }
    if (type && type === "saleItems") {
        const saleItems = finalProducts.filter(
            single => single.discount && single.discount > 0
        );
        return saleItems.slice(0, limit ? limit : saleItems.length);
    }
    return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price: number, discount: number) => {
    return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems: any[], product: {
    id: any;
    variation: any;
}, color: any, size: any) => {
    let productInCart = cartItems.filter(
        single =>
            single.id === product.id &&
            (single.selectedProductColor
                ? single.selectedProductColor === color
                : true) &&
            (single.selectedProductSize ? single.selectedProductSize === size : true)
    )[0];
    if (cartItems.length >= 1 && productInCart) {
        if (product.variation) {
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
    if (products && sortType && sortValue) {
        if (sortType === "category") {
            return products.filter(
                product => product.category.filter((single: string) => single === sortValue)[0]
            );
        }
        if (sortType === "tag") {
            return products.filter(
                product => product.tag.filter((single: string) => single === sortValue)[0]
            );
        }
        if (sortType === "color") {
            return products.filter(
                product =>
                    product.variation &&
                    product.variation.filter((single: { color: string; }) => single.color === sortValue)[0]
            );
        }
        if (sortType === "size") {
            return products.filter(
                product =>
                    product.variation &&
                    product.variation.filter(
                        (single: { size: any[]; }) => single.size.filter((single: {
                            name: string;
                        }) => single.name === sortValue)[0]
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
                    return b.price - a.price;
                });
            }
            if (sortValue === "priceLowToHigh") {
                return sortProducts.sort((a, b) => {
                    return a.price - b.price;
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
            product.category &&
            product.category.map((single: any) => {
                return productCategories.push(single);
            })
        );
    });
    return getIndividualItemArray(productCategories);
};

// get individual tags
export const getIndividualTags = (products: any[]) => {
    let productTags: any[] = [];
    products &&
    products.map(product => {
        return (
            product.tag &&
            product.tag.map((single: any) => {
                return productTags.push(single);
            })
        );
    });
    return getIndividualItemArray(productTags);
};

// get individual colors
export const getIndividualColors = (products: any[]) => {
    let productColors: any[] = [];
    products &&
    products.map(product => {
        return (
            product.variation &&
            product.variation.map((single: { color: any; }) => {
                return productColors.push(single.color);
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
            product.variation &&
            product.variation.map((single: { size: any[]; }) => {
                return single.size.map(single => {
                    return productSizes.push(single.name);
                });
            })
        );
    });
    return getIndividualItemArray(productSizes);
};

// get product individual sizes
export const getIndividualSizes = (product: { variation: any[]; }) => {
    let productSizes: any[] = [];
    product.variation &&
    product.variation.map(singleVariation => {
        return (
            singleVariation.size &&
            singleVariation.size.map((singleSize: { name: any; }) => {
                return productSizes.push(singleSize.name);
            })
        );
    });
    return getIndividualItemArray(productSizes);
};

export const setActiveSort = (e: { currentTarget: { classList: { add: (arg0: string) => void; }; }; }) => {
    const filterButtons = document.querySelectorAll(
        ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
    );
    filterButtons.forEach(item => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e: { currentTarget: { classList: { add: (arg0: string) => void; }; }; }) => {
    const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
    gridSwitchBtn.forEach(item => {
        item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = (e: { currentTarget: { classList: { toggle: (arg0: string) => void; }; }; }) => {
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
