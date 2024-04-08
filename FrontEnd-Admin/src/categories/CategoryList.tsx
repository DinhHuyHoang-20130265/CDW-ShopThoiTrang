import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    Datagrid,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton,
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
            <TextField source="id"/>
            <TextField source="name"/>
            <SelectField source="parentId" choices={categories}/>
            <DateField source="releaseDate"/>
            <BooleanField source="status" label="Trạng thái"/>

            <>
                <EditButton/>
                <ShowButton/>
            </>
        </DatagridConfigurable>
        <Pagination/>
    </List>
)};


export default CategoryList;
