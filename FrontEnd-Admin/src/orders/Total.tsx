import * as React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRecordContext, useTranslate } from 'react-admin';

import { Order } from '../types';
import {styled} from "@mui/material/styles";

const Total = () => {
    const record = useRecordContext<Order>();

    return (
        <Table sx={{ minWidth: '35em' }}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Tạm tính
                    </TableCell>
                    <TableCellRight>
                        {record?.totalAmount.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCellRight>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Phí giao hàng
                    </TableCell>
                    <TableCellRight>
                        {record?.shippingFee.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCellRight>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        Tổng cộng
                    </TableCell>
                    <TableCellRight sx={{ fontWeight: 'bold' }}>
                        {(record?.totalAmount + record?.shippingFee).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </TableCellRight>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const TableCellRight = styled(TableCell)({ textAlign: 'right' });

export default Total;
