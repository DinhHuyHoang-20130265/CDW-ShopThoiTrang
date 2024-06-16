import * as React from 'react';
import {
    ArrayField, Button,
    CreateButton,
    DatagridConfigurable,
    DateField, DeleteButton,
    EditButton,
    ExportButton, FilterList, FilterListItem, FilterLiveSearch, FunctionField,
    List, SavedQueriesList,
    SelectColumnsButton, TextField,
    TopToolbar, UpdateButton
} from 'react-admin';
import {useMediaQuery, Theme, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';
import UserListAside from "./UserListAside";
import UserLinkField from "./UserLinkField";
import MobileGrid from "./MobileGrid";
import {styled} from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FilterListIcon from '@mui/icons-material/FilterList';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect} from "react";
import {authProvider} from "../authProvider";
import RestoreIcon from '@mui/icons-material/Restore';
import {checkPermission} from "../helpers";

const BootstrapDialog = styled(Dialog)(({theme}: any) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function CustomDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} id={'filter'} label={"Filter"}>
                <FilterListIcon/>
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Filter"}
                </DialogTitle>
                <DialogContent>
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
                        icon={<LockIcon/>}
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
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} label={'Xác nhận'}>
                        <DoneOutlineIcon/>
                    </Button>
                    <Button onClick={handleClose} autoFocus label={'Huỷ'}>
                        <CancelIcon/>
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const UserListActions = (props: any) => (
    <TopToolbar>
        {props.permissions && checkPermission(props.permissions, "USER_CREATE") && <CreateButton/>}
        {props.isSmall && <CustomDialog/>}
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

const UserList = () => {
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            setPermissions(response.permissions)
        })
    }, [])
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            sort={{field: 'createdDate', order: 'DESC'}}
            perPage={25}
            aside={<UserListAside/>}
            actions={<UserListActions permissions={permissions} isSmall={isSmall}/>}
            sx={{height: '100%'}}
        >
            {isXsmall ? (
                <MobileGrid permissions={permissions}/>
            ) : (
                <DatagridConfigurable
                    sx={{
                        '& .column-groups': {
                            md: {display: 'none'},
                            lg: {display: 'table-cell'},
                        },
                    }}
                    bulkActionButtons={false}
                >
                    <UserLinkField
                        source="fullName"
                        label="Họ tên"
                    />
                    <TextField source="username" label="Tên đăng nhập"/>
                    <DateField source="createdDate" label={"Ngày tạo"}/>
                    <FunctionField render={
                        (record: any) => {
                            return (<ArrayField label={"Tuỳ chọn"}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    {permissions && checkPermission(permissions, "USER_UPDATE") &&
                                        <EditButton/>}
                                    {permissions && checkPermission(permissions, "USER_DELETE") && !record.deleted &&
                                        <DeleteButton mutationMode={'pessimistic'}/>}
                                    {permissions && checkPermission(permissions, "USER_UPDATE") && record.deleted &&
                                        <UpdateButton resource={'user/deleted'} label="Restore"
                                                      data={{deleted: false}}
                                                      sx={{
                                                          color: 'green',
                                                          borderColor: 'green',
                                                      }}>
                                            <RestoreIcon/>
                                        </UpdateButton>}
                                </div>
                            </ArrayField>)
                        }
                    }
                    />
                </DatagridConfigurable>
            )}
        </List>
    );
};

export default UserList;
