import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    SortButton,
    TopToolbar,
    useGetResourceLabel, FunctionField, ReferenceArrayField, Edit, EditButton, ShowView, SingleFieldList, ChipField,
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

export const ProductList = () => (
    <List>
        <Datagrid
            rowClick="show"
            bulkActionButtons={
                <>
                    <BulkUpdateButton data={{stock: 100}} label="Refill stock"/>
                    <BulkDeleteButton/>
                </>
            }
        >
            <ImageField source="imageUrl" label="Ảnh"/>
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
    </List>
);

export default ProductList;
