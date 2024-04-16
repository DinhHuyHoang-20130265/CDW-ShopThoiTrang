import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import {Link, useTranslate, useGetMany, useRecordContext} from 'react-admin';
import {styled} from '@mui/material/styles';
import {Order, Product} from '../types';

const ListItem = () => {
    const record = useRecordContext<Order>();
    const translate = useTranslate();

    const productIds = record ? record.orderDetails.map((item: any) => item.productId.id) : [];
    const {isLoading, data: products} = useGetMany<Product>(
        'product',
        {ids: productIds},
        {enabled: !!record}
    );
    const productsById = products
        ? products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {} as any)
        : {};

    if (isLoading || !record || !products) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Sản phẩm
                    </TableCell>
                    <TableCellRight>
                        Đơn giá
                    </TableCellRight>
                    <TableCellRight>
                        Số lượng
                    </TableCellRight>
                    <TableCellRight>
                        Thành tiền
                    </TableCellRight>
                </TableRow>
            </TableHead>
            <TableBody>
                {record.orderDetails.map((item: any) => (
                    <TableRow key={item.productId.id}>
                        <TableCell>
                            <Link to={`/product/${item.productId.id}`}>
                                {productsById[item.productId.id].name}
                            </Link>
                            ({item.variation.color} - {item.size.size})
                        </TableCell>
                        <TableCellRight>
                            {item.price.toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'VND',
                                }
                            )}
                        </TableCellRight>
                        <TableCellRight>{item.quantity}</TableCellRight>
                        <TableCellRight>
                            {(
                                item.price *
                                item.quantity
                            ).toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </TableCellRight>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const TableCellRight = styled(TableCell)({textAlign: 'right'});

export default ListItem;
