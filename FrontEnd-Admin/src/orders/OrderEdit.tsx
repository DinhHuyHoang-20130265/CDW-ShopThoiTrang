import * as React from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    Form,
    Labeled,
    PrevNextButtons,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    useRecordContext,
    useTranslate,
} from 'react-admin';
import {Link as RouterLink} from 'react-router-dom';
import {Card, CardContent, Box, Grid, Typography, Link} from '@mui/material';

import {Order, Customer} from '../types';
import ListItem from "./ListItem";
import Total from "./Total";
import {useEffect, useState} from "react";
import axios from "axios";

const OrderEdit = () => (
    <Edit component="div">
        <OrderForm/>
    </Edit>
);

// const OrderTitle = () => {
//     const record = useRecordContext<Order>();
//     return record ? (
//         <span>
//             {translate('resources.commands.title', {
//                 reference: record.reference,
//             })}
//         </span>
//     ) : null;
// };

const CustomerDetails = () => {
    const record = useRecordContext();
    return (
        <div>
            <Typography
                component={RouterLink}
                color="primary"
                to={`/user/${record?.id}`}
                style={{textDecoration: 'none'}}
            >
                {record?.user.userInfo.fullName} ({record?.user.username})
            </Typography>
            <br/>
            <Typography
                component={Link}
                color="primary"
                href={`mailto:${record?.email}`}
                style={{textDecoration: 'none'}}
            >
                {record?.user.userInfo.email}
            </Typography>
        </div>
    );
};

const CustomerAddress = () => {
    const record = useRecordContext();
    return (
        <div>
            <Typography>
                {record?.name}
            </Typography>
            <Typography>
                {record?.phone}
            </Typography>
            <Typography>
                {record?.address}
            </Typography>
        </div>
    );
};

const Spacer = () => <Box mb={1}>&nbsp;</Box>;

const OrderForm = () => {
    const [status, setStatus] = useState([]);

    useEffect(() => {
            const fetchStatus = async () => {
                const {data}: any = await axios.get(`${process.env.REACT_APP_API_URL}/order-status`,{
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                })
                if (data) {
                    setStatus(data);
                }
            };
            fetchStatus();
        }, []
    );
    console.log(status);
    return (
        <Form warnWhenUnsavedChanges>
            <Box maxWidth="50em">
                <PrevNextButtons
                    filterDefaultValues={{statusId: 1}}
                    sort={{field: 'id', order: 'DESC'}}
                />
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    Đơn đặt hàng
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="Ngày đặt">
                                            <DateField source="orderDate"/>
                                        </Labeled>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled source="Mã đơn">
                                            <TextField source="id"/>
                                        </Labeled>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <SelectInput
                                            source="status.id"
                                            label={"Trạng thái"}
                                            choices={status.map((item: any) => ({
                                                id: item.id,
                                                name: item.name
                                            }))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Box mt={2}>
                                            <BooleanInput
                                                row={true}
                                                source="returned"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    Khách hàng
                                </Typography>
                                <CustomerDetails/>
                                <Spacer/>

                                <Typography variant="h6" gutterBottom>
                                    Địa chỉ giao hàng
                                </Typography>
                                <CustomerAddress/>
                            </Grid>
                        </Grid>
                        <Spacer/>

                        <Typography variant="h6" gutterBottom>
                            Sản phẩm
                        </Typography>
                        <div>
                            <ListItem />
                        </div>
                        <Spacer/>

                        <Typography variant="h6" gutterBottom>
                            Thanh toán
                        </Typography>
                        <div>
                            <Total />
                        </div>
                    </CardContent>
                    <Toolbar/>
                </Card>
            </Box>
        </Form>
    );
};

export default OrderEdit;