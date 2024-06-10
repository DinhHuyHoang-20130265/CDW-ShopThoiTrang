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
    <TextInput label="Tiêu đề" source="title" />,
    <BooleanField label="Trạng thái" source="status" />
];

const BlogList = () => {
    return(
        <List
            sort={{field: 'title', order: 'ASC'}}
            perPage={10}
            pagination={false}
            component="div"
            actions={<ListActions/>}
            filters={postFilters}
        >
            <DatagridConfigurable>
                <TextField source="id" label="ID"/>
                <ImageField source="thumbnail" label="Ảnh"/>
                <TextField source="title" label={"Tiêu đề"}/>
                <TextField source="description" label={"Mô tả"} sx={{width: "200px"}}/>
                <DateField source="createDate" label="Ngày tạo"/>
                <BooleanField source="status" label="Trạng thái"/>

                <>
                    <EditButton/>
                    <ShowButton/>
                </>
            </DatagridConfigurable>
            <Pagination/>
        </List>
    )};


export default BlogList;
