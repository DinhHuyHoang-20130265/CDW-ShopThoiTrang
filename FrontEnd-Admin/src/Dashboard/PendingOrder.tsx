import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useReference } from 'react-admin';

import { Customer, Order } from '../types';

interface Props {
    order: Order;
}

export const PendingOrder = (props: Props) => {
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
                        sx={{ bgcolor: 'background.paper' }}
                        alt={`${order?.user?.userInfo?.fullName}`}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={new Date(order.orderDate).toLocaleString('en-GB')}
                secondary= {'của ' + (order?.user?.userInfo?.fullName)+ ', ' + (order?.orderDetails?.length) + ' sản phẩm'}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {order.totalAmount}$
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
