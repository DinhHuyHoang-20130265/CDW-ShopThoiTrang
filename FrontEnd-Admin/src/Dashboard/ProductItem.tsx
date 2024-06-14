import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box, useMediaQuery, Theme,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useReference} from 'react-admin';

import {Customer, Product} from '../types';

interface Props {
    product: Product;
    quantity: number;
}

export const ProductItem = (props: Props) => {
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const {product, quantity} = props;

    return (
        <ListItem button component={Link} to={`/product/${product.id}`}>
            <ListItemAvatar>
                {!product.imageUrl ? (
                    <Avatar/>
                ) : (
                    <Avatar
                        src={`${product?.imageUrl}?size=32x32`}
                        sx={{bgcolor: 'background.secondary'}}
                        alt={`${product?.name}`}
                    />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={product.name}
                secondary={quantity !== -1 ? (quantity + ' sản phẩm đã bán') : 'Sản phẩm hết hàng cho 1 hoặc nhiều biến thể'}
            />
            {!isXSmall ? (
                <ListItemSecondaryAction>
                    <Box
                        component="span"
                        sx={{
                            marginRight: '1em',
                            color: 'text.primary',
                        }}
                    >
                        {product?.price?.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </Box>
                </ListItemSecondaryAction>
            ):
                <></>
            }

        </ListItem>
    );
};
