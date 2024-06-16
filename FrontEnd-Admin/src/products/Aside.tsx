import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
    useGetList,
} from 'react-admin';

import {Category, Product} from '../types';
import LockIcon from "@mui/icons-material/Lock";
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const Aside = () => {
    const {data} = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

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
                    label="Trạng thái"
                    icon={<LockIcon/>}
                >
                    <FilterListItem
                        label="Đã ẩn"
                        value={{
                            status: false,
                        }}
                    />
                    <FilterListItem
                        label="Hiển thị"
                        value={{
                            status: true,
                        }}
                    />

                </FilterList>
                <FilterList
                    label="Đã bị xoá"
                    icon={<DeleteIcon/>}
                >
                    <FilterListItem
                        label="Đã xoá"
                        value={{deleted: true}}
                    />
                    <FilterListItem
                        label="Chưa xoá"
                        value={{deleted: false}}
                    />

                </FilterList>
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
                    label="Danh mục"
                    icon={<CategoryIcon/>}
                >
                    {data &&
                        data.map((record: any) => (
                            <FilterListItem
                                label={record.name}
                                key={record.id}
                                value={{categoryId: record.id}} // Truyền record làm giá trị của value
                            />
                        ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default Aside;
