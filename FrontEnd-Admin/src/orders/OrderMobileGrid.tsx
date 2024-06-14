import * as React from 'react';
import {Box, Card, CardContent, CardHeader, Chip, Typography} from '@mui/material';
import {
    DateField,
    EditButton,
    RecordContextProvider,
    useListContext, TextField, ImageField, FunctionField, ChipField, NumberField
} from 'react-admin';

import {Order} from '../types';
import {useEffect, useState} from "react";
import axios from "axios";
import listItem from "./ListItem";

const OrderMobileGrid = () => {
    const {data, isLoading} = useListContext<Order>();
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            const {data}: any = await axios.get(`${process.env.REACT_APP_API_URL}/order-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            if (data) {
                setStatusList(data);
            }
        };
        fetchStatus().then();
    }, []);

    const colors: any = {
        1: "primary",
        2: "secondary",
        3: "info",
        4: "warning",
        5: "success",
        6: "default",
        7: "error"
    }
    if (isLoading || data.length === 0)
        return null;

    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{margin: '0.5rem 0'}}>
                        <CardHeader
                            title={`${record.name}`}
                            subheader={
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                    <DateField source="orderDate" label={"Ngày tạo đơn hàng"}/>
                                    <Typography variant="h6" component="h6" sx={{marginRight: "5px"}}>
                                        Trạng thái: <Chip label={record.status.name} color={colors[record.status.id]}/>
                                    </Typography>
                                </div>}
                            action={<EditButton/>}
                        />
                        <CardContent
                            sx={{pt: 0, display: "flex", flexDirection: 'column', justifyContent: "center"}}>
                            <Typography variant="h6" component="h6" sx={{marginRight: "5px"}}>
                                ID đơn hàng: <TextField source="id" label="ID đơn hàng"/>
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{marginRight: "5px"}}>
                                Tên khách hàng: <TextField source="name" label="Tên khách hàng"/>
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{marginRight: "5px"}}>
                                Mã vận chuyển: <TextField source="shippingCode" label="Mã vận chuyển"/>
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{marginRight: "5px"}}>
                                Tổng tiền: <NumberField
                                source="totalAmount"
                                sx={{marginLeft: "5px"}}
                                options={{
                                    style: "currency",
                                    currency: "VND",
                                }}
                                label="Tổng tiền"
                            />
                            </Typography>

                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default OrderMobileGrid;
