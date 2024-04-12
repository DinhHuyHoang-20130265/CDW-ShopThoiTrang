import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton, DatagridConfigurable, useGetList, DeleteButton,
} from 'react-admin';

import {
    Datagrid,
    List,
    NumberField,
    ImageField,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";
import {Theme, useMediaQuery} from "@mui/material";
import MobileGrid from "../users/MobileGrid";
import {Category} from "../types";
import OrderAside from "./OrderAside";

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
            filters={isSmall ? visitorFilters : undefined}
            sort={{field: 'name', order: 'DESC'}}
            perPage={25}
            aside={<OrderAside/>}
            actions={<VisitorListActions/>}
        >
            {isXsmall ? (
                <MobileGrid/>
            ) : (
                <DatagridConfigurable
                    rowClick="show"
                    // bulkActionButtons={
                    //     <>
                    //         <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                    //         <BulkDeleteButton/>
                    //     </>
                    // }
                >
                    <NumberField source="id" label="ID"/>
                    <TextField source="name" label="Tên"/>
                    <NumberField source="totalAmount" label="Tổng tiền"/>
                    <TextField
                        source={"user.userInfo.fullName"}
                    />
                    <EditButton/>
                </DatagridConfigurable>
            )}
        </List>
    )
};

export default OrderList;
