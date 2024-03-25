import * as React from 'react';
import {
    CreateButton,
    DatagridConfigurable,
    DateField,
    DateInput,
    ExportButton,
    List,
    SearchInput,
    SelectColumnsButton, TextField,
    TopToolbar,
} from 'react-admin';
import {useMediaQuery, Theme} from '@mui/material';
import UserListAside from "./UserListAside";
import MobileGrid from "./MobileGrid";
import UserLinkField from "./UserLinkField";

const visitorFilters = [
    <SearchInput alwaysOn name={"search"} source={"filter"}/>,
    <DateInput source="createdDate" name={"createdDate"}/>,
];

const VisitorListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

const UserList = () => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{field: 'createdDate', order: 'DESC'}}
            perPage={25}
            aside={<UserListAside/>}
            actions={<VisitorListActions/>}
        >
            {isXsmall ? (
                <MobileGrid/>
            ) : (
                <DatagridConfigurable
                    rowClick="edit"
                    sx={{
                        '& .column-groups': {
                            md: {display: 'none'},
                            lg: {display: 'table-cell'},
                        },
                    }}>
                    <UserLinkField
                        source="fullName"
                        label="Họ tên"
                    />
                    <TextField source="username" label="Tên đăng nhập"/>
                    <DateField source="createdDate" label={"Ngày tạo"}/>
                    {/*<ColoredNumberField*/}
                    {/*    source="total_spent"*/}
                    {/*    options={{style: 'currency', currency: 'VND'}}*/}
                    {/*/>*/}
                    {/*<DateField source="latest_purchase" showTime/>*/}
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default UserList;
