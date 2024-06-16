import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, ImageField, FunctionField, ChipField, NumberField, DeleteButton
} from 'react-admin';

import {Coupon} from '../types';
import {checkPermission} from "../helpers";

const MobileCouponGrid = ({permissions}: any) => {
    const {data, isLoading} = useListContext<Coupon>();

    return (
        <Box margin="0.5em">
            {data && data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.name}`}
                            subheader={
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography variant="caption" color="textSecondary" component="span">
                                        Ngày hết hạn: <DateField source="expiredDate" label={" Ngày hết hạn"}/>
                                    </Typography>
                                </div>
                            }
                            action={<div style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                                {permissions && checkPermission(permissions, "COUPON_UPDATE") &&
                                    <EditButton/>}
                                {permissions && checkPermission(permissions, "COUPON_DELETE") &&
                                    <DeleteButton mutationMode={'pessimistic'}/>}
                            </div>}
                        />
                        <CardContent sx={{pt: 0, display: "flex", alignItems: "center", float: "inline-start"}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="caption" color="textSecondary" component="span">
                                    Giảm: -<TextField source="price" sx={{color: 'red'}}/>%
                                </Typography>
                                <FunctionField
                                    source="orders"
                                    sx={{display: "flex", flexDirection: "column"}}
                                    label="Số hoá đơn đã sử dụng"
                                    render={(record: any) => (
                                        <Typography variant="caption" color="textSecondary" component="span">
                                            Số lượt còn lại: {record && record.quantity} lượt
                                        </Typography>
                                    )}
                                />
                            </div>

                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileCouponGrid;
