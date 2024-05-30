import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import { useTranslate } from 'react-admin';

import { Order } from '../types';
import { PendingOrder } from './PendingOrder';

interface Props {
    orders?: Order[];
}

const PendingOrders = (props: Props) => {
    const { orders = [] } = props;

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader title={"Đơn hàng chờ xử lý"} />
            <List dense={true}>
                {orders.map(record => (
                    <PendingOrder key={record.id} order={record} />
                ))}
            </List>
        </Card>
    );
};

export default PendingOrders;
