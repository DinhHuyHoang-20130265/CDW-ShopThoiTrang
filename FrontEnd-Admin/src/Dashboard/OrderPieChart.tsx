import {Order} from "../types";
import {Card, CardContent, CardHeader} from "@mui/material";
import React from "react";
import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import {DefaultizedPieValueType} from "@mui/x-charts";
import {Tooltip} from "recharts";

const OrderPieChart = (props: { orders?: Order[] }) => {
    const {orders} = props;

    const aggregateOrders = (orders: Order[]): Aggregate => {
        return orders.reduce((acc: any, curr: any) => {
            switch (curr.status.id) {
                case 1:
                    acc.odersPending.push(curr);
                    break;
                case 2:
                    acc.ordersPackaging.push(curr);
                    break;
                case 3:
                    acc.ordersWaiting.push(curr);
                    break;
                case 4:
                    acc.ordersDelivering.push(curr);
                    break;
                case 5:
                    acc.ordersCompleted.push(curr);
                    break;
                case 6:
                    acc.ordersProcessing.push(curr);
                    break;
                case 7:
                    acc.ordersCancelled.push(curr);
                    break;
            }
            return acc;
        }, {
            odersPending: [],
            ordersPackaging: [],
            ordersWaiting: [],
            ordersDelivering: [],
            ordersCompleted: [],
            ordersProcessing: [],
            ordersCancelled: []
        });
    }

    const aggregate = aggregateOrders(orders || []);

    const data: { label: string, value: number, color: string }[] = [
        {label: 'Chờ xác nhận', value: aggregate.odersPending.length, color: '#0088FE'},
        {label: 'Đang đóng gói', value: aggregate.ordersPackaging.length, color: 'rgb(243,155,43)'},
        {label: 'Chờ đơn vị vận chuyển', value: aggregate.ordersWaiting.length, color: '#FFBB28'},
        {label: 'Đang giao', value: aggregate.ordersDelivering.length, color: '#FF8042'},
        {label: 'Hoàn thành', value: aggregate.ordersCompleted.length, color: '#00C49F'},
        {label: 'Đang xử lý', value: aggregate.ordersProcessing.length, color: 'rgb(82,80,80)'},
        {label: 'Đã Hủy', value: aggregate.ordersCancelled.length, color: '#ff0b0b'},
    ];

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <Card>
            <CardHeader title="Trạng thái đơn hàng"/>
            <CardContent>
                <PieChart
                    series={[
                        {
                            arcLabel: getArcLabel,
                            arcLabelMinAngle: 45,
                            data,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}
                    height={360}
                />
            </CardContent>
        </Card>

    )
}

interface Aggregate {
    odersPending: Order[];
    ordersPackaging: Order[];
    ordersWaiting: Order[];
    ordersDelivering: Order[];
    ordersCompleted: Order[];
    ordersProcessing: Order[];
    ordersCancelled: Order[];
}


export default OrderPieChart;