import * as React from 'react';
import {Card, CardContent} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
} from 'react-admin';
import DeleteIcon from "@mui/icons-material/Delete";

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
            <FilterLiveSearch label={"Tìm..."} name={"search"}/>

            <SavedQueriesList/>

            <FilterList
                label="Loại tài khoản"
                icon={<PersonIcon/>}>
                <FilterListItem
                    label="Admin"
                    value={{
                        type: "ADMIN"
                    }}
                />
                <FilterListItem
                    label="User"
                    value={{
                        type: "USER"
                    }}
                />
            </FilterList>

            <FilterList
                label="Trạng thái tài khoản"
                icon={<LockIcon/>}
            >
                <FilterListItem
                    label="Đã khoá"
                    value={{status: false}}
                />
                <FilterListItem
                    label="Chưa khoá"
                    value={{status: true}}
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
        </CardContent>
    </Card>
);

export default UserListAside;
