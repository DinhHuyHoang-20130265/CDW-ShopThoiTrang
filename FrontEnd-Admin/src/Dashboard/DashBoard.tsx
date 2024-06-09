import {Customer, Order, Review} from "../types";
import {Theme, useMediaQuery} from "@mui/material";
import React, {CSSProperties, useMemo} from "react";
import {endOfMonth, startOfDay, startOfMonth, subDays} from "date-fns";
import {useGetList} from "react-admin";
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from "./NbNewOrders";
import OrderChart from "./OrderChart";
import PendingOrders from "./PendingOrders";
import PendingReviews from "./PendingReviews";
import NewCustomers from "./NewCustomers";
import OrderPieChart from "./OrderPieChart";
import NbNewUsers from "./NbNewUsers";
import NbNewReviews from "./NbNewReviews";

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

    const {data: ordersMonth} = useGetList<Order>('order', {
        filter: {date_gte: aMonthAgo.toISOString()},
        sort: {field: "OrderDate", order: "DESC"},
        pagination: {page: 1, perPage: 50}
    })

    const {data: orders} = useGetList<Order>('order', {
        sort: {field: "OrderDate", order: "DESC"},
        pagination: {page: 1, perPage: 50}
    })

    const {data: users} = useGetList<Customer>('user', {
        pagination: {page: 1, perPage: 50}
    })

    const {data: reviews} = useGetList<Review>('review', {
        sort: { field: 'reviewedDate', order: 'DESC' },
        pagination: { page: 1, perPage: 100 },
    });

    // get month current
    const currentMonth = new Date().getMonth() + 1;

    // i want get orders that have order date in month current
    const ordersCurrentMonth = useMemo(() => {
        if (!orders) return [];
        return orders.filter((order: any) => {
            const orderDate = new Date(order.orderDate);
            return orderDate && orderDate.getMonth() + 1 === currentMonth && order.status.id !== 7;
        });
    }, [orders]);

    const getRevenue = (orders: Order[]) => {
        return orders.reduce((total: number, order: any) => total + order.totalAmount, 0);
    }

    // get user that have created date in month current
    const usersCurrentMonth = useMemo(() => {
        if (!users) return [];
        return users.filter((user: any) => {
            const createdDate = new Date(user.createdDate);
            return createdDate && createdDate.getMonth() + 1 === currentMonth;
        });
    }, [users]);

    // get reviews that have reviewed date in month current
    const reviewsCurrentMonth = useMemo(() => {
        if (!reviews) return [];
        return reviews.filter((review: any) => {
            const reviewedDate = new Date(review.reviewedDate);
            return reviewedDate && reviewedDate.getMonth() + 1 === currentMonth;
        });
    }, [reviews]);

    console.log(reviewsCurrentMonth);

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
                        })}/>
                        <Spacer/>
                        <NbNewOrders value={ordersCurrentMonth.length}/>
                        <Spacer/>
                        <NbNewUsers value={usersCurrentMonth.length}/>
                        <Spacer/>
                        <NbNewReviews value={reviewsCurrentMonth.length}/>
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={orders}/>
                    </div>
                </div>
                <div style={styles.fullCol}>
                    <div style={styles.leftCol}>
                        <div>
                            <OrderPieChart orders={orders}/>
                        </div>
                        <div style={styles.singleCol}>
                            <PendingOrders orders={pendingOrders}/>
                        </div>

                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.flex}>
                            <PendingReviews reviews={reviews}/>
                            <Spacer/>
                            <NewCustomers/>
                        </div>
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

const styles = {
    flex: {display: 'flex'},
    flexColumn: {display: 'flex', flexDirection: 'column'},
    leftCol: {flex: 1, marginRight: '0.5em'},
    rightCol: {flex: 1, marginLeft: '0.5em'},
    fullCol: {marginTop: '1em', marginBottom: '1em', display: 'flex'},
    singleCol: {marginTop: '1em', marginBottom: '1em'},
};