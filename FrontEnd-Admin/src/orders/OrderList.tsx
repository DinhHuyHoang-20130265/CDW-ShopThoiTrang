import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    SelectColumnsButton,
    DatagridConfigurable,
    useGetList, ArrayField, Button, FilterLiveSearch, SavedQueriesList, FilterList, FilterListItem, Count
} from 'react-admin';

import {
    List,
    NumberField,
    TextField,
} from "react-admin";
import {Dialog, DialogActions, DialogContent, DialogTitle, Theme, useMediaQuery} from "@mui/material";
import {Category} from "../types";
import OrderAside from "./OrderAside";
import LinkToUser from "./LinkToUser";
import OrderMobileGrid from "./OrderMobileGrid";
import FilterListIcon from "@mui/icons-material/FilterList";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import CategoryIcon from "@mui/icons-material/CategoryRounded";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import {styled} from "@mui/material/styles";
import {useEffect, useState} from "react";
import axios from "axios";


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

    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            const {data}: any = await axios.get(`${process.env.REACT_APP_API_URL}/order-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            if (data) {
                setStatusList(data);
            }
        };
        fetchStatus().then();
    }, []);

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
                <DialogContent sx={{overflowY: "scroll"}}>
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
                        {statusList &&
                            statusList.map((record: any) => (
                                <FilterListItem
                                    label={
                                        <>
                                            {`${record.name}`}
                                            (<Count
                                            filter={{
                                                statusId: record.id
                                            }}
                                            sx={{lineHeight: 'inherit'}}
                                        />)
                                        </>
                                    }
                                    key={record.id}
                                    value={{statusId: record.id}}
                                />
                            ))}
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

const OrderListActions = (props: any) => (
    <TopToolbar>
        {props.isSmall && <CustomDialog/>}
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);


export const OrderList = () => {
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            sort={{field: 'id', order: 'DESC'}}
            perPage={25}
            aside={<OrderAside/>}
            actions={<OrderListActions isSmall={isSmall}/>}
        >
            {isXsmall ? (
                <OrderMobileGrid/>
            ) : (
                <DatagridConfigurable
                    rowClick={false}
                    bulkActionButtons={false}
                >
                    <NumberField source="id" label="ID"/>
                    <TextField source="name" label="Tên"/>
                    <FunctionField render={(record: any) => record?.orderDetails?.length} label="SL Sản Phẩm"/>
                    <NumberField source="totalAmount" label="Tổng tiền"/>
                    <ArrayField label="Người mua">
                        <LinkToUser/>
                    </ArrayField>
                    <ArrayField label="Tuỳ chọn">
                        <EditButton/>
                    </ArrayField>
                </DatagridConfigurable>
            )}
        </List>
    )
};

export default OrderList;
