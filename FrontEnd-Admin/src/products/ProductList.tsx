import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    SortButton,
    TopToolbar,
    useGetResourceLabel,
    FunctionField,
    ReferenceArrayField,
    Edit,
    EditButton,
    ShowView,
    SingleFieldList,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton,
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
import UserListAside from "../users/UserListAside";
import {Theme, useMediaQuery} from "@mui/material";
import MobileGrid from "../users/MobileGrid";
import Aside from "./Aside";

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
                <Datagrid

                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                            <BulkDeleteButton/>
                        </>
                    }
                >
                    <ImageField sx={{m:"auto"}} className={"cent"} source="imageUrl" label="Ảnh"/>
                    <TextField source="name" label="Tên SP"/>
                    <TextField source="description" label="Mô tả"/>
                    <FunctionField
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
                </Datagrid>
            )}
        </List>)
};

export default ProductList;
