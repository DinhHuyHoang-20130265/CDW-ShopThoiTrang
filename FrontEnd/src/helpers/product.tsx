// get products
export const getProducts = (products: any[], category: any, type: string, limit: any) => {
    const finalProducts = category
        ? products.filter(
            product => product.categories.find((single: any) => single.name === category) !== undefined
        ) : products;
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
export const getSortedProducts = (products: any[], colors: string[], sizes: string[], categories: string[], searchValue: string, orderBy: string) => {
    let filteredProducts = [...products];
    if (products.length > 0) {
        filteredProducts = filteredProducts.filter((product: any) => product.name.toLowerCase().includes(searchValue.toLowerCase()));
        if (colors.length > 0) {
            filteredProducts = filteredProducts.filter(item => {
                const arrayCheck = item.variations.map((item: any) => item.color)
                return colors.every(color => arrayCheck.includes(color))
            });
        }
        if (sizes.length > 0) {
            filteredProducts = filteredProducts.filter(product => {
                let productSizes: any[] = [];
                product.variations.map((variation: any) => {
                    variation.sizes.map((size: any) => {
                        if (productSizes.find(item => item === size.size) === undefined)
                            productSizes.push(size.size);
                    })
                })
                return sizes.every(size => productSizes.includes(size));
            });
        }
        if (categories.length > 0) {
            filteredProducts = filteredProducts.filter(item => {
                const arrayCheck = item.categories.map((item: any) => item.name);
                return categories.every(category => arrayCheck.includes(category))
            });
        }
        console.log(orderBy)
        if (orderBy === "default") {
            return filteredProducts;
        }
        if (orderBy === "priceHighToLow") {
            return filteredProducts.sort((a, b): any => {
                const price_a = getDiscountPrice(a.price.price, a.promotions[0]) || a.price.price;
                const price_b = getDiscountPrice(b.price.price, b.promotions[0]) || b.price.price;
                return price_b - price_a;
            });
        }
        if (orderBy === "priceLowToHigh") {
            return filteredProducts.sort((a, b) => {
                const price_a = getDiscountPrice(a.price.price, a.promotions[0]) || a.price.price;
                const price_b = getDiscountPrice(b.price.price, b.promotions[0]) || b.price.price;
                return price_a - price_b;
            });
        }
        return filteredProducts;
    } else
        return filteredProducts;
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


export const setActiveSort = (e: any, type: string, list_target: string) => {
    if (type === 'all') {
        const filterButtons = document.querySelectorAll(
            `.sidebar-widget-list-left.${list_target} button`
        );
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
    } else {
        document.querySelectorAll(
            `.sidebar-widget-list-left.${list_target} button`
        )[0].classList.remove("active");
        e.currentTarget.classList.toggle("active");
    }
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

export const formatCurrency = (num: any) => {
    if (isNaN(num)) {
        throw new Error('Input must be a number');
    }

    // Convert to number if it's a string representation of a number
    const number = typeof num === 'string' ? parseFloat(num) : num;

    // Use toLocaleString for currency formatting
    const formattedNumber = number.toLocaleString('vi-VN');

    // Append the currency symbol
    return `${formattedNumber}đ`;
};
