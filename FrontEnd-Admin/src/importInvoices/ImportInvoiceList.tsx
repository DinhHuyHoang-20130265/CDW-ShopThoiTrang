import * as React from 'react';
import {
    ArrayInput,
    Create, CreateButton,
    DatagridConfigurable,
    DateField, DateInput,
    ExportButton,
    FilterButton, FormTab, FunctionField,
    List,
    NumberField, NumberInput,
    Pagination,
    SelectColumnsButton, ShowButton,
    SimpleForm, SimpleFormIterator, TabbedForm,
    TextField,
    TextInput,
    TopToolbar, useListController
} from 'react-admin';
import {Stack} from '@mui/material';
import ImportInvoiceShow from "./ImportInvoiceShow";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton label={"Nhập hàng"}/>
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
];

const ImportInvoiceList = () => {
    const {data, isLoading}: any = useListController();

    if (isLoading) return null;

    const getQuantity = (record: any) => {
        let quantity = 0;
        for (let i = 0; i < record.importInvoiceDetails.length; i++) {
            quantity += record.importInvoiceDetails[i].quantity;
        }
        return quantity;
    }

    return data && (
        <List
            sort={{field: 'id', order: 'ASC'}}
            perPage={10}
            pagination={false}
            component="div"
            actions={<ListActions/>}
            filters={postFilters}
        >
            <DatagridConfigurable
                rowClick="expand"
                expand={<ImportInvoiceShow />}
            >
                <TextField source="id" label={"Mã nhập hàng"}/>
                <DateField source="importDate" label={"Ngày nhập hàng"}/>
                <TextField source="importBy.username" label={"Người nhập hàng"}/>
                <FunctionField render={(record: any) => (
                    <span>{getQuantity(record)}</span>
                )} label={"Số lượng"}/>
                <NumberField source="totalPrice" label={"Tổng tiền"}/>
            </DatagridConfigurable>
            <Pagination/>
        </List>
    )
};


export default ImportInvoiceList;
