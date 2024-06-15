import * as React from 'react';
import {Avatar, Box, Button, Card, CardHeader, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import CustomerIcon from '@mui/icons-material/PersonAdd';
import {Link} from 'react-router-dom';
import {
    ListBase,
    WithListContext,
    SimpleList,
    useTranslate,
} from 'react-admin';
import {subDays} from 'date-fns';

import CardWithIcon from './CardWithIcon';
import {Customer} from '../types';
import {FixedSizeList} from "react-window";

interface LoyalCustomersProps {
    totalAmount: number;
    totalOrders: number;
    user: Customer;
}

const NewCustomers = (loyalCustomers: any) => {
    const formatPrice = (price: any) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    return (
        <Card sx={{flex: 1}}>
            <CardHeader
                title="Khách hàng tiềm năng"
                // subheader="Khách hàng mới trong 30 ngày qua"
                // action={
                //     <Button
                //         component={Link}
                //         to="/user"
                //         size="small"
                //         color="primary"
                //     >
                //         Xem tất cả
                //     </Button>
                // }
            />
            <FixedSizeList
                height={400}
                itemCount={loyalCustomers.loyalCustomers.length}
                itemSize={60}
                width="100%"
                style={{listStyle: 'none', padding: 0}}
            >
                {({index, style}) => {
                    const loyalCustomer = loyalCustomers.loyalCustomers[index];
                    return (
                        <div style={style}>
                            <ListItem
                                key={loyalCustomer.user.id}
                                button
                                component={Link}
                                to={`/user/${loyalCustomer.user.id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={`${loyalCustomer?.user?.userInfo?.avtUrl}?size=32x32`}
                                        sx={{ bgcolor: 'background.secondary' }}
                                        alt={`${loyalCustomer?.user?.userInfo?.fullName}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={loyalCustomer.user.userInfo.fullName}
                                    secondary={"Đã mua " + loyalCustomer.totalOrders + " đơn hàng, tổng cộng " + formatPrice(loyalCustomer.totalAmount)}
                                />
                            </ListItem>
                        </div>
                    );
                }
                }
            </FixedSizeList>
        </Card>
    );
};

export default NewCustomers;
