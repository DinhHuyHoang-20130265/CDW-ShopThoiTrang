import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton, DatagridConfigurable, useGetList,
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
import Aside from "./Aside";
import {Category} from "../types";

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

export const ProductList = () => {
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
            aside={<Aside/>}
            actions={<VisitorListActions/>}
        >
            {isXsmall ? (
                <MobileGrid/>
            ) : (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                            <BulkDeleteButton/>
                        </>
                    }
                >
                    <ImageField sx={{m: "auto"}} className={"cent"} source="imageUrl" label="Ảnh"/>
                    <TextField source="name" label="Tên SP"/>
                    <TextField source="description" label="Mô tả"/>
                    <FunctionField
                        source="categories"
                        label="Danh mục"
                        render={(record: any) => (
                            record.categories.map((category: any) => (
                                <ChipField record={category} source="name" key={category.id}/>
                            ))
                        )}
                    />

                    <NumberField
                        source="price.price"
                        options={{
                            style: "currency",
                            currency: "VND",
                        }}
                        label="Giá"
                    />
                    <EditButton/>
                </DatagridConfigurable>
            )}
        </List>)
};

export default ProductList;
