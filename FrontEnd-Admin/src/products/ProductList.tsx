import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton, DatagridConfigurable,
} from 'react-admin';

import {
    List,
    NumberField,
    ImageField,
    TextField,
    BulkDeleteButton,
    BulkUpdateButton,
} from "react-admin";
import {Theme, useMediaQuery} from "@mui/material";
import Aside from "./Aside";
import MobileProductGrid from "./MobileProductGrid";

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

const ProductList = () => {
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
                <MobileProductGrid/>
            ) : (
                <DatagridConfigurable
                    rowClick="show"
                    bulkActionButtons={
                        <>
                            <BulkUpdateButton data={{status: false}} label="Ẩn hết tất cả sản phẩm đã chọn"/>
                            <BulkDeleteButton label={"Xoá"}/>
                        </>
                    }
                >
                    <NumberField source="id" label="ID"/>
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
        </List>
    )
};

export default ProductList;
