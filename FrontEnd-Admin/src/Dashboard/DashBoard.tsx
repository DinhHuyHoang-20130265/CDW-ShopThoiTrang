import {Order} from "../types";
import {Theme, useMediaQuery} from "@mui/material";
import React, {CSSProperties, useMemo} from "react";
import {startOfDay, subDays} from "date-fns";
import {useGetList} from "react-admin";
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from "./NbNewOrders";
import OrderChart from "./OrderChart";
import PendingOrders from "./PendingOrders";
import PendingReviews from "./PendingReviews";
import NewCustomers from "./NewCustomers";
import OrderPieChart from "./OrderPieChart";

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

    const {data: orders} = useGetList<Order>('order', {
        // filter: {date_gte: aMonthAgo.toISOString()},
        sort: {field: "OrderDate", order: "DESC"},
        pagination: {page: 1, perPage: 50}
    })


    const aggregation = useMemo<State>(() => {
        if (!orders) return {};
        const aggregations = orders
            .filter((order: any) => order.status !== 'cancelled')
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
            recentOrders: orders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders
        }
    }, [orders]);

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
                <OrderChart orders={recentOrders}/>
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
                        <MonthlyRevenue value={revenue}/>
                        <Spacer/>
                        <NbNewOrders value={nbNewOrders}/>
                        <Spacer/>
                        <MonthlyRevenue value={revenue}/>
                        <Spacer/>
                        <NbNewOrders value={nbNewOrders}/>
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={recentOrders}/>
                    </div>
                </div>
                <div style={styles.fullCol}>
                    <div style={styles.leftCol}>
                        <div>
                            <OrderPieChart orders={recentOrders}/>
                        </div>
                        <div style={styles.singleCol}>
                            <PendingOrders orders={pendingOrders}/>
                        </div>

                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.flex}>
                            <PendingReviews/>
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