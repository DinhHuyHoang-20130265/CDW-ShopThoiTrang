import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import {
    Count,
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
    useGetList,
} from 'react-admin';

import CategoryIcon from '@mui/icons-material/CategoryRounded';
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import {useEffect, useState} from "react";
import axios from "axios";


const OrderAside = () => {

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

    return (
        <Card
            sx={{
                display: {
                    xs: 'none',
                    md: 'block',
                },
                order: -1,
                flex: '0 0 15em',
                mr: 2,
                mt: 6,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{pt: 1}}>
                <FilterLiveSearch label={"Tìm..."} name={"search"}/>

                <SavedQueriesList/>


                <FilterList
                    label="Giá"
                    icon={<AttachMoneyRoundedIcon/>}
                >
                    <FilterListItem
                        label="0 - 99.000"
                        value={{
                            price_lt: 100000,
                            price_gt: undefined,
                        }}
                    />
                    <FilterListItem
                        label="100.000 - 299.000"
                        value={{
                            price_lt: 300000,
                            price_gt: 100000,
                        }}
                    />
                    <FilterListItem
                        label="300.000 trở lên"
                        value={{
                            price_lt: undefined,
                            price_gt: 300000,
                        }}
                    />

                </FilterList>

                <FilterList
                    label="Trạng thái"
                    icon={<CategoryIcon/>}
                >
                    {status &&
                        status.map((record: any) => (
                            <FilterListItem
                                label={
                                    <>
                                        {`${record.name}`}
                                        (<Count
                                            filter={{
                                                statusId: record.id // Thay vì choice.name, sử dụng statusId
                                            }}
                                            sx={{ lineHeight: 'inherit'}} // Thêm style nếu cần
                                        />)
                                    </>
                                }
                                key={record.id}
                                value={{statusId: record.id}}
                            />
                        ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default OrderAside;
