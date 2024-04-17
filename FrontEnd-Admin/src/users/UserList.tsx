import * as React from 'react';
import {
    ArrayField, BulkDeleteButton, BulkUpdateButton,
    CreateButton,
    DatagridConfigurable,
    DateField,
    DateInput, EditButton,
    ExportButton,
    List,
    SearchInput,
    SelectColumnsButton, TextField,
    TopToolbar,
} from 'react-admin';
import {useMediaQuery, Theme} from '@mui/material';
import UserListAside from "./UserListAside";
import UserLinkField from "./UserLinkField";
import MobileGrid from "./MobileGrid";

const visitorFilters = [
    <SearchInput alwaysOn name={"q"} source={"filter"}/>,
    <DateInput source="createdDate" name={"createdDate"}/>,
];

const UserListActions = () => (
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
            actions={<UserListActions/>}
        >
            {isXsmall ? (
                <MobileGrid/>
            ) : (
                <DatagridConfigurable
                    sx={{
                        '& .column-groups': {
                            md: {display: 'none'},
                            lg: {display: 'table-cell'},
                        },
                    }}
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{enabled: false}} label="Ngưng hoạt động tất cả tài khoản đã chọn"/>
                            <BulkDeleteButton label={"Xoá"}/>
                        </>
                    }
                >
                    <UserLinkField
                        source="fullName"
                        label="Họ tên"
                    />
                    <TextField source="username" label="Tên đăng nhập"/>
                    <DateField source="createdDate" label={"Ngày tạo"}/>
                    <ArrayField label={"Tuỳ chọn"}>
                        <EditButton/>
                    </ArrayField>
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default UserList;
