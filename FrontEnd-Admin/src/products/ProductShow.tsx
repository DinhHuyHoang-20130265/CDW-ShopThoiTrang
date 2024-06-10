import * as React from 'react';
import {
    ArrayField,
    BooleanField, ChipField, Datagrid, DatagridHeader,
    DateField, FunctionField, ImageField, Labeled, NumberField, RichTextField,
    Show, SimpleShowLayout, TextField, useRecordContext, useShowContext, useShowController,
} from 'react-admin';
import {Grid, Stack, Table, Typography} from "@mui/material";
import {ColorField} from "react-admin-color-picker";


const ProductShow = () => {
    const getPromotionPrice = (product: any) => {
        const currentDate = new Date();
        const activePromotion = product.promotions.find((promotion: any) => {
            const startDate = new Date(promotion.startDate);
            const endDate = new Date(promotion.endDate);
            return (currentDate >= startDate && currentDate <= endDate && promotion.status) ? promotion : null;
        });

        if (activePromotion !== null && activePromotion !== undefined) {
            const discountedPrice = product.price.price - (product.price.price * activePromotion.discount) / 100;
            return (<div>
                <span style={{
                    textDecorationLine: "line-through",
                    fontSize: 18,
                    fontWeight: 'bold'
                }}>{formatPrice(product.price.price)}</span>
                <br/>
                <span style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>{formatPrice(discountedPrice)} <span
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>({activePromotion.discount}%)</span> </span>
            </div>);
        }
        return (
            <span style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>{formatPrice(product.price.price)}</span>
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    return (
        <>
            <Show>
                <Grid container spacing={2} sx={{margin: 2}}>
                    <Grid item xs={12} sm={4} alignContent={"center"} justifyContent={"center"}>
                        <ImageField
                            source="imageUrl"
                            textAlign={"center"}
                            label={"Thumbnail"}
                            sx={{ '& img': { width: "100% !important", height: "100% !important" } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{marginBottom: 4}}>
                        <Stack spacing={2}>
                            <Labeled label="Mã sản phẩm">
                                <TextField source="id" sx={{fontSize: 'larger'}}/>
                            </Labeled>
                            <TextField source="name" sx={{fontSize: 28, fontWeight: 'bold'}}/>
                            <RichTextField source="description"/>
                            <FunctionField
                                label="Giá"
                                render={(record: any) => (
                                    getPromotionPrice(record)
                                )}
                            />
                            <FunctionField
                                source="categories"
                                label="Danh mục"
                                render={(record: any) => (
                                    record.categories.map((category: any) => (
                                        <ChipField sx={{margin: "2px"}} record={category} source="name" key={category.id}/>
                                    ))
                                )}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={10} sm={10} sx={{backgroundColor: "lightgrey", borderRadius: 4, margin: "auto"}}>
                        <RichTextField source="content" sx={{margin: 'auto'}}/>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <ArrayField source="variations">
                            <Datagrid bulkActionButtons={false}>
                                <NumberField source="id" label={'Mã sản phẩm'} textAlign={"center"}/>
                                <TextField source="color" label={'Màu'} textAlign={"center"}/>
                                <ColorField source="colorCode" label={'Mã Màu'}/>
                                <ArrayField source="sizes" label={'Các kích thước'} textAlign={'center'}>
                                    <Datagrid bulkActionButtons={false}>
                                        <NumberField source="id" label={'Mã size'} textAlign={"center"}/>
                                        <TextField source="size" label='Size' textAlign={"center"}/>
                                        <NumberField source="stock" label='Tồn kho' textAlign={"center"}/>
                                        <BooleanField source="status" label={'Trạng thái'} textAlign={"center"}/>
                                    </Datagrid>
                                </ArrayField>
                            </Datagrid>
                        </ArrayField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Labeled label="Ngày tạo">
                            <DateField source="createdDate"/>
                        </Labeled>
                    </Grid>
                </Grid>
            </Show>
        </>
    );
};



export default ProductShow;
