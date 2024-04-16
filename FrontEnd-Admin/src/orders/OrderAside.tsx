import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
    useGetList,
} from 'react-admin';

import CategoryIcon from '@mui/icons-material/CategoryRounded';
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";


const OrderAside = () => {
    const statuses = [
        { id: 1, name: 'CHỜ XÁC NHẬN' },
        { id: 2, name: 'ĐANG ĐÓNG GÓI' },
        { id: 3, name: 'CHỜ ĐƠN VỊ VẬN CHUYỂN' },
        { id: 4, name: 'ĐANG GIAO HÀNG' },
        { id: 5, name: 'THÀNH CÔNG' },
        { id: 6, name: 'ĐANG XỬ LÝ' },
        { id: 7, name: 'ĐÃ HỦY' }
    ];

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

                {/*<FilterList*/}
                {/*    label="Trạng thái"*/}
                {/*    icon={<LockIcon/>}*/}
                {/*>*/}
                {/*    <FilterListItem*/}
                {/*        label="Đã ẩn"*/}
                {/*        value={{*/}
                {/*            status: false,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <FilterListItem*/}
                {/*        label="Hiển thị"*/}
                {/*        value={{*/}
                {/*            status: true,*/}
                {/*        }}*/}
                {/*    />*/}

                {/*</FilterList>*/}

                <FilterList
                    label="Giá"
                    icon={<AttachMoneyRoundedIcon />}
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
                    label="Danh mục"
                    icon={<CategoryIcon />}
                >
                    {statuses &&
                        statuses.map((record: any) => (
                            <FilterListItem
                                label={record.name}
                                key={record.id}
                                value={{statusId: record.id}} // Truyền record làm giá trị của value
                            />
                        ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default OrderAside;
