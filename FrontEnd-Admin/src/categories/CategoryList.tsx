import * as React from 'react';
import {
    BooleanField, CreateButton,
    Datagrid, DatagridConfigurable, DateField,
    EditButton, ExportButton, FilterButton,
    List, NumberField, Pagination,
    RecordContextProvider, ReferenceManyCount, SearchInput, SelectColumnsButton, ShowButton, TextField, TextInput,
    TopToolbar,
    useListContext,
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = [
    <SearchInput source="name" alwaysOn/>,
    // <TextInput label="Title" source="name" defaultValue="Hello, World!" />,
];

const CategoryList = () => {
    return(
    <List
        sort={{field: 'name', order: 'ASC'}}
        perPage={20}
        pagination={false}
        component="div"
        actions={<ListActions/>}
        filters={postFilters}
    >
        <DatagridConfigurable>
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="parentId"/>
            <DateField source="releaseDate"/>
            <BooleanField source="status" label="Com."/>
            <>
                <EditButton/>
                <ShowButton/>
            </>
        </DatagridConfigurable>
        <Pagination/>
    </List>
)};


export default CategoryList;
