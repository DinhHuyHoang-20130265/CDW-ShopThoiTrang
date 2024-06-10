import {Customer, Order, Product, Review} from "../types";
import {Theme, useMediaQuery} from "@mui/material";
import React, {CSSProperties, useMemo} from "react";
import {endOfMonth, startOfDay, startOfMonth, subDays} from "date-fns";
import {useGetList} from "react-admin";
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from "./NbNewOrders";
import OrderChart from "./OrderChart";
import PendingOrders from "./PendingOrders";
import PendingReviews from "./PendingReviews";
import OrderPieChart from "./OrderPieChart";
import NbNewUsers from "./NbNewUsers";
import NbNewReviews from "./NbNewReviews";
import BestSeller from "./BestSeller";
import OutOfStock from "./OutOfStock";

const Spacer = () => <span style={{width: '1em'}}/>;
const VerticalSpacer = () => <span style={{height: '1em'}}/>;


const DashBoard = () => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg')
    );

    // get a month ago
    const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

    // get month current
    const currentMonth = new Date().getMonth() + 1;

    // get month ago
    const monthAgo = new Date().getMonth() > 0 ? new Date().getMonth() : 12;

    // get orders of month ago
    const {data: ordersMonth} = useGetList<Order>('order', {
        filter: {date_gte: aMonthAgo.toISOString()},
        sort: {field: "OrderDate", order: "DESC"},
        pagination: {page: 1, perPage: 50}
    })

    // get orders
    const {data: orders} = useGetList<Order>('order', {
        sort: {field: "OrderDate", order: "DESC"},
        pagination: {page: 1, perPage: 50}
    })

    // get users
    const {data: users} = useGetList<Customer>('user', {
        pagination: {page: 1, perPage: 50}
    })

    // get reviews
    const {data: reviews} = useGetList<Review>('review', {
        sort: { field: 'reviewedDate', order: 'DESC' },
        pagination: { page: 1, perPage: 100 },
    });

    // get prducts
    const {data: products} = useGetList<Product>('product', {
        sort: { field: 'name', order: 'DESC' },
        pagination: { page: 1, perPage: 100 },
    });


    // get orders by month
    const useOrdersByMonth = (month: number) => {
        return useMemo(() => {
            if (!orders) return [];
            return orders.filter((order: any) => {
                const orderDate = new Date(order.orderDate);
                return orderDate && orderDate.getMonth() + 1 === month && order.status.id !== 7;
            });
        }, [orders, month]);
    };
    const ordersCurrentMonth = useOrdersByMonth(currentMonth);
    const ordersLastMonth = useOrdersByMonth(monthAgo);

    // get revenue of orders
    const getRevenue = (orders: Order[]) => {
        return orders.reduce((total: number, order: any) => total + order.totalAmount, 0);
    }

    // get user that have created date in month
    const useUsersByMonth = (month: number) => {
        return useMemo(() => {
            if (!users) return [];
            return users.filter((user: any) => {
                const createdDate = new Date(user.createdDate);
                return createdDate && createdDate.getMonth() + 1 === month;
            });
        }, [users, month]);
    }

    const usersCurrentMonth = useUsersByMonth(currentMonth);
    const usersLastMonth = useUsersByMonth(monthAgo);

    // get reviews that have reviewed date in month current
    const useReviewsByMonth = (month: number) => {
        return useMemo(() => {
            if (!reviews) return [];
            return reviews.filter((review: any) => {
                const reviewedDate = new Date(review.reviewedDate);
                return reviewedDate && reviewedDate.getMonth() + 1 === month;
            });
        }, [reviews, month]);
    }

    const reviewsCurrentMonth = useReviewsByMonth(currentMonth);
    const reviewsLastMonth = useReviewsByMonth(monthAgo);

    // get aggregation
    const aggregation = useMemo<State>(() => {
        if (!ordersMonth) return {};
        const aggregations = ordersMonth
            .filter((order: any) => order.status.id !== '7')
            .reduce(
                (stats: OrderStats, order: any) => {
                    if (order.status.id !== 7) {
                        stats.nbNewOrders++;
                        stats.revenue += order.totalAmount;
                        if (order.status.id === 1) {
                            stats.pendingOrders.push(order);
                        }
                    }
                    return stats;
                },
                {nbNewOrders: 0, pendingOrders: [], revenue: 0}
            );
        return {
            recentOrders: ordersMonth,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders
        }
    }, [ordersMonth]);

    const {nbNewOrders, pendingOrders, revenue, recentOrders} = aggregation;


    const compareGetPercent = (currentRevenue: number, lastRevenue: number) => {
        if (lastRevenue === 0) {
            if (currentRevenue === 0) {
                return {
                    percentageChange: 0,
                    isIncrease: false
                };
            } else {
                return {
                    percentageChange: 100,
                    isIncrease: true
                };
            }
        }

        const change = currentRevenue - lastRevenue;
        const percentageChange = (change / lastRevenue) * 100;
        const isIncrease = change >= 0;

        return {
            percentageChange,
            isIncrease
        } as Percent;
    };

    // get product best seller
    const getBestSeller = (orders: any) => {
        if (!orders) return [];

        const products: any = [];

        // Lọc các đơn hàng có statusId khác 7
        const validOrders = orders.filter((order: any) => order.statusId !== 7);

        validOrders.forEach((order: any) => {
            order.orderDetails.forEach((orderDetail: any) => {
                if (products[orderDetail.productId.id]) {
                    products[orderDetail.productId.id].quantity += orderDetail.quantity;
                } else {
                    products[orderDetail.productId.id] = {
                        product: orderDetail.productId,
                        quantity: orderDetail.quantity,
                    };
                }
            });
        });

        return Object.values(products)
            .sort((a: any, b: any) => b.quantity - a.quantity)
            .slice(0, 10);
    };

    const bestSeller = useMemo(() => getBestSeller(orders), [orders]);

    // get product out of stock
    const getOutOfStock = (products: any): Product[] => {
        if (!products) {
            return [];
        }

        return products.filter((product:any) =>
            product.variations.some((variation : any) =>
                variation.sizes.some((size : any) => size.stock === 0)
            )
        );
    };

    const outOfStock = useMemo(() => getOutOfStock(products), [products]);

    console.log(outOfStock);

    return isXSmall ? (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <MonthlyRevenue value={revenue}/>
                <VerticalSpacer/>
                <NbNewOrders value={nbNewOrders}/>
                <VerticalSpacer/>
                <PendingOrders orders={pendingOrders}/>
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
            </div>
            <div style={styles.flex}>
                <MonthlyRevenue value={revenue}/>
                <Spacer/>
                <NbNewOrders value={nbNewOrders}/>
            </div>
            <div style={styles.singleCol}>
                <OrderChart orders={orders}/>
            </div>
            <div style={styles.singleCol}>
                <PendingOrders orders={pendingOrders}/>
            </div>
        </div>
    ) : (
        <>
            <div style={{margin: "10px"}}>
                <div>
                    <div style={{display: "flex", flex: 1}}>
                        <MonthlyRevenue value={getRevenue(ordersCurrentMonth).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                        percent={compareGetPercent(getRevenue(ordersCurrentMonth),getRevenue(ordersLastMonth))}
                        />
                        <Spacer/>
                        <NbNewOrders value={ordersCurrentMonth.length}
                                     percent={compareGetPercent(ordersCurrentMonth.length,ordersLastMonth.length)}
                        />
                        <Spacer/>
                        <NbNewUsers value={usersCurrentMonth.length}
                                    percent={compareGetPercent(usersCurrentMonth.length,usersLastMonth.length)}
                        />
                        <Spacer/>
                        <NbNewReviews value={reviewsCurrentMonth.length}
                                      percent={compareGetPercent(reviewsCurrentMonth.length,reviewsLastMonth.length)}
                        />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={orders}/>
                    </div>
                </div>
                <div style={styles.fullCol}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
                            <OrderPieChart orders={orders}/>
                        </div>
                        <div style={styles.singleCol}>
                            <BestSeller products={bestSeller}/>
                        </div>

                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.singleCol}>
                            <PendingOrders orders={pendingOrders}/>
                        </div>
                        <div style={styles.singleCol}>
                            <OutOfStock products={outOfStock}/>
                        </div>


                        {/*<div style={styles.flex}>*/}
                        {/*    <PendingReviews reviews={reviews}/>*/}
                        {/*    <Spacer/>*/}
                        {/*    <NewCustomers/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );

}

export default DashBoard;

interface OrderStats {
    nbNewOrders: number;
    pendingOrders: Order[];
    revenue: number;
}

interface State {
    nbNewOrders?: number;
    pendingOrders?: Order[];
    recentOrders?: Order[];
    revenue?: string;
}

interface Percent {
    percentageChange: number;
    isIncrease: boolean;
}

const styles = {
    flex: {display: 'flex'},
    flexColumn: {display: 'flex', flexDirection: 'column'},
    leftCol: {flex: 1, marginRight: '0.5em'},
    rightCol: {flex: 1, marginLeft: '0.5em'},
    fullCol: {marginTop: '1em', marginBottom: '1em', display: 'flex'},
    singleCol: {marginTop: '1em', marginBottom: '1em'},
};