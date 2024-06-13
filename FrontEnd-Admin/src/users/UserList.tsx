import * as React from 'react';
import {
    ArrayField, BulkDeleteButton, BulkUpdateButton, Button,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton, FilterList, FilterListItem, FilterLiveSearch,
    List, SavedQueriesList,
    SelectColumnsButton, TextField,
    TopToolbar
} from 'react-admin';
import {useMediaQuery, Theme, Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material';
import UserListAside from "./UserListAside";
import UserLinkField from "./UserLinkField";
import MobileGrid from "./MobileGrid";
import {styled} from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import FilterListIcon from '@mui/icons-material/FilterList';

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
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} label={'Xác nhận'}/>
                    <Button onClick={handleClose} autoFocus label={'Huỷ'}/>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const UserListActions = (props: any) => (
    <TopToolbar>
        <CreateButton/>
        {props.isSmall && <CustomDialog/>}
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

const UserList = () => {
    //
    // useEffect(() => {
    //     console.log(permissions, isLoading, error)
    // }, [permissions, isLoading, error]);
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            sort={{field: 'createdDate', order: 'DESC'}}
            perPage={25}
            aside={<UserListAside/>}
            actions={<UserListActions isSmall={isSmall}/>}
            sx={{height: '100%'}}
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
