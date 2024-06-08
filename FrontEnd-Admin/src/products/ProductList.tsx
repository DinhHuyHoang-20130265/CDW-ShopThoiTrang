import * as React from 'react';
import {
    CreateButton,
    ExportButton,
    TopToolbar,
    FunctionField,
    EditButton,
    ChipField,
    SearchInput, DateInput, SelectColumnsButton, DatagridConfigurable, useRecordContext, WrapperField, ArrayField,
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

    const getPromotionPrice = (product: any) => {
        const currentDate = new Date();
        const activePromotion = product.promotions.find((promotion: any) => {
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);
            return (currentDate >= startDate && currentDate <= endDate && promotion.status);
        });


        if (activePromotion) {
            const discountedPrice = product.price.price - (product.price.price * activePromotion.discount) / 100;
            return (<div>
                <span style={{textDecorationLine: "line-through"}}>{formatPrice(product.price.price)}</span>
                <br/>
                <span style={{color: 'red'}}>{formatPrice(discountedPrice)}</span>
            </div>);
        }
        return (
            <span>{formatPrice(product.price.price)}</span>
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    const Test = () => {
        const record = useRecordContext();
        if (!record) return null;
        console.log(record);
        return null;
    };
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
                    bulkActionButtons={false}
                >
                    {/*<Test/>*/}
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

                    <FunctionField
                        label="Giá"
                        source="price"
                        render={(record: any) => getPromotionPrice(record)}
                        sortable
                    />

                    <ArrayField label="Hành động">
                        <EditButton/>
                    </ArrayField>
                </DatagridConfigurable>
            )}
        </List>
    )
};

export default ProductList;
