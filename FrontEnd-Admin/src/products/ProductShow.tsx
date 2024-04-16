import * as React from 'react';
import {
    ArrayField,
    BooleanField, ChipField, Datagrid, DatagridHeader,
    DateField, FunctionField, ImageField, Labeled, NumberField, RichTextField,
    Show, SimpleShowLayout, TextField, useRecordContext, useShowContext, useShowController,
} from 'react-admin';
import {Grid, Stack, Table, Typography} from "@mui/material";


const ProductShow = () => {
    const {record} = useShowController();
    console.log(record);
    return (
        <>
            <Show>
                <Grid container spacing={2} sx={{margin: 2}}>
                    <Grid item xs={12} sm={4} alignContent={"center"} justifyContent={"center"}>
                        <ImageField source="imageUrl" textAlign={"center"} label={"Thumbnail"}/>
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{marginBottom: 4}}>
                        <Stack spacing={2}>
                            <Labeled label="Mã sản phẩm">
                                <TextField source="id" sx={{fontSize: 'larger'}}/>
                            </Labeled>
                            <TextField source="name" sx={{fontSize: 28, fontWeight: 'bold'}}/>
                            <RichTextField source="description"/>
                            <NumberField source="price.price" sx={{fontSize: 20, fontWeight: 'bold'}}/>
                            <FunctionField
                                source="categories"
                                label="Danh mục"
                                render={(record: any) => (
                                    record.categories.map((category: any) => (
                                        <ChipField record={category} source="name" key={category.id}/>
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
                                <NumberField source="id"/>
                                <TextField source="color"/>
                                <ArrayField source="sizes">
                                    <Datagrid bulkActionButtons={false}>
                                        <NumberField source="id"/>
                                        <TextField source="size"/>
                                        <NumberField source="stock"/>
                                        <BooleanField source="status"/>
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
