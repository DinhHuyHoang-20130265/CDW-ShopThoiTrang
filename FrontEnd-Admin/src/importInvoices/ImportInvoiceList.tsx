import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    Datagrid,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton, ImageField,
    List,
    NumberField,
    Pagination,
    RecordContextProvider,
    ReferenceField,
    ReferenceManyCount,
    SearchInput,
    SelectColumnsButton, SelectField, SelectInput,
    ShowButton,
    TextField,
    TextInput,
    TopToolbar, useGetList,
    useListContext,
} from 'react-admin';
import {useEffect, useState} from "react";
import {Category} from "../types";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters =  [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn />,
];

const ImportInvoiceList = () => {
    return(
        <List
            sort={{field: 'id', order: 'ASC'}}
            perPage={10}
            pagination={false}
            component="div"
            actions={<ListActions/>}
            filters={postFilters}
        >
            <DatagridConfigurable>
                <TextField source="id"/>
                <TextField source="product.name"/>
                <TextField source="variation.color"/>
                <TextField source="size.size"/>
                <NumberField source="importPrice" />
                <NumberField source="quantity"/>
                <DateField source="importDate"/>
                <>
                    <EditButton/>
                    <ShowButton/>
                </>
            </DatagridConfigurable>
            <Pagination/>
        </List>
    )};


export default ImportInvoiceList;
