import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import { useTranslate } from 'react-admin';

import { Order } from '../types';
import { PendingOrder } from './PendingOrder';
import {FixedSizeList} from "react-window";

interface Props {
    orders?: Order[];
}

const PendingOrders = (props: Props) => {
    const { orders = [] } = props;

    const Row = ({ index, style } : any) => {
        const record = orders[index];
        return (
            <div style={style}>
                <PendingOrder key={record.id} order={record} />
            </div>
        );
    };

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader title={"Đơn hàng chờ xử lý"} />
            <FixedSizeList
                height={400} // Đặt chiều cao cố định cho danh sách
                itemCount={orders.length}
                itemSize={60} // Điều chỉnh kích thước của mỗi item theo thực tế
                width="100%"
                style={{ listStyle: 'none', padding: 0 }} // Ẩn dấu hiệu của danh sách
            >
                {Row}
            </FixedSizeList>
        </Card>
    );
};

export default PendingOrders;
