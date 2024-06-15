import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box, useMediaQuery, Theme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useReference } from 'react-admin';

import { Customer, Order } from '../types';

interface Props {
    order: Order;
}

export const PendingOrder = (props: Props) => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const { order } = props;
    const { referenceRecord: customer, isLoading } = useReference<Customer>({
        reference: 'customers',
        id: order.customer_id,
    });

    return (
        <ListItem button component={Link} to={`/order/${order.id}`}>
            <ListItemAvatar>
                {isLoading ? (
                    <Avatar />
                ) : (
                    <Avatar
                        src={`${order?.user?.userInfo?.avtUrl}?size=32x32`}
                        sx={{ bgcolor: 'background.secondary' }}
                        alt={`${order?.user?.userInfo?.fullName}`}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
                secondary={new Date(order.orderDate).toLocaleString('vi-VN')}
                primary= {isXSmall ? 'Đơn hàng #' + order.id+ ', ' + (order?.orderDetails?.length) + ' sản phẩm' :'Đơn hàng #' + order.id +' của ' + (order?.user?.userInfo?.fullName)+ ', ' + (order?.orderDetails?.length) + ' sản phẩm'}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {order.totalAmount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
