import {
    ArrayInput, AutocompleteInput,
    BooleanInput, Create, DateInput,
    Edit, ImageField, ImageInput, NullableBooleanInput, NumberInput, ReferenceInput,
    required, SimpleFormIterator, TabbedForm,
    TextInput, useEditContext, useGetList,
} from "react-admin";
import {Grid, InputAdornment, Typography} from "@mui/material";
import React from "react";
import {Category, Product} from "../types";

const PromotionCreate = () => {

    const {record, isLoading}: any = useEditContext();

    const {data} = useGetList<Product>('product', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    if (isLoading) return null;
    return (
        <Create>
            <TabbedForm warnWhenUnsavedChanges>
                <TabbedForm.Tab
                    label="Thông tin khuyến mãi"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh minh hoạ
                            </Typography>
                            <ImageInput name={"thumbnail"} source={"thumbnail"}>
                                <ImageField source="src" label="Ảnh chính"/>
                            </ImageInput>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextInput source="name" label="Tên khuyến mãi" validate={required()} fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextInput source="description" label="Mô tả" fullWidth multiline/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DateInput source="startDate" label="Ngày bắt đầu" fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DateInput source="endDate" label="Ngày kết thúc" fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <NumberInput
                                source="discount"
                                label="Giảm giá"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">%</InputAdornment>
                                    ),
                                }}
                                min={0}
                                max={100}
                                defaultValue={0}
                                validate={required()}
                                fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <NullableBooleanInput source="status" label="Trạng thái" defaultValue={false} fullWidth/>
                        </Grid>


                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Sản phẩm khuyến mãi"
                    path="products"
                    sx={{maxWidth: '40em'}}
                >
                    <ArrayInput source={`products`} label={`Sản phẩm`}>
                        <SimpleFormIterator inline>
                            <ReferenceInput source="id" reference="product" label="Sản phẩm" fullWidth>
                                <AutocompleteInput optionText="name" sx={{width: '40em'}}/>
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Create>
    )
};

export default PromotionCreate;

