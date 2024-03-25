import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnOutlined';
import LockIcon from '@mui/icons-material/Lock';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
} from 'react-admin';

const UserListAside = () => (
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
            <FilterLiveSearch label={"Tìm..."}/>

            <SavedQueriesList/>


            <FilterList
                label="Đã mua hàng"
                icon={<MonetizationOnIcon/>}
            >
                <FilterListItem
                    label="Có"
                    value={{
                        nb_commands_gte: 1,
                        nb_commands_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="Không"
                    value={{
                        nb_commands_gte: undefined,
                        nb_commands_lte: 0,
                    }}
                />
            </FilterList>

            <FilterList
                label="Trạng thái tài khoản"
                icon={<LockIcon/>}
            >
                <FilterListItem
                    label="Đã khoá"
                    value={{has_ordered: true}}
                />
                <FilterListItem
                    label="Chưa khoá"
                    value={{has_ordered: false}}
                />
            </FilterList>

        </CardContent>
    </Card>
);

export default UserListAside;
