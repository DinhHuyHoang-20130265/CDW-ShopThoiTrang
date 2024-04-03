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

                {/*<FilterList*/}
                {/*    label="Danh mục"*/}
                {/*    icon={<LocalOfferIcon />}*/}
                {/*>*/}
                {/*    {data &&*/}
                {/*        data.map((record: any) => (*/}
                {/*            <FilterListItem*/}
                {/*                label={record.name}*/}
                {/*                key={record.id}*/}
                {/*                value={{categories: record}} // Truyền record làm giá trị của value*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*</FilterList>*/}
            </CardContent>
        </Card>
    );
};
export default Aside;
