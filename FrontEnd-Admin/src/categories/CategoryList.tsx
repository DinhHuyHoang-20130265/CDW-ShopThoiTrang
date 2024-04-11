import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton,
    List,
    Pagination,
    SelectColumnsButton, SelectField,
    TextField,
    TextInput,
    TopToolbar, useGetList,
} from 'react-admin';
import {useEffect, useState} from "react";
import {Category} from "../types";
import LinkToProducts from "./LinkToProducts";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = (cate: any) => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn />,
    <TextInput label="Tên" source="name" />,
    <BooleanField label="Trạng thái" source="status" />
];

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return(
    <List
        sort={{field: 'name', order: 'ASC'}}
        perPage={20}
        pagination={false}
        component="div"
        actions={<ListActions/>}
        filters={postFilters(categories)}
    >
        <DatagridConfigurable>
            <TextField source="id" label={"Id"}/>
            <TextField source="name" label={"Tên"}/>
            <SelectField source="parentId" choices={categories} label={"Danh mục cha"}/>
            <DateField source="releaseDate" label={"Ngày tạo"}/>
            <BooleanField source="status" label="Trạng thái"/>
            <>
                <LinkToProducts/>
                <EditButton sx={{marginLeft:5}}/>
            </>
        </DatagridConfigurable>
        <Pagination/>
    </List>
)};


export default CategoryList;
