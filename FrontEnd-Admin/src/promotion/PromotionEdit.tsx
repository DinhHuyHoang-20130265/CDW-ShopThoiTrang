import {
    ArrayInput, AutocompleteInput,
    BooleanInput, DateInput,
    Edit, ImageField, NumberInput, ReferenceInput,
    required, SimpleFormIterator, TabbedForm,
    TextInput, useEditContext, useGetList,
} from "react-admin";
import {Grid, InputAdornment, Typography} from "@mui/material";
import React from "react";

const PromotionEdit = () => {

    const {record, isLoading}: any = useEditContext();
    console.log(record);

    const {products}:any= useGetList('product', { pagination: { page: 1, perPage: 100 }, sort: { field: 'name', order: 'ASC' } })

    console.log(products);
    if (isLoading) return null;
    return (
        <Edit>
            <TabbedForm warnWhenUnsavedChanges>
                <TabbedForm.Tab
                    label="Thông tin khuyến mãi"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ImageField source={"thumbnail"} label="Ảnh" fullWidth/>
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
                            <BooleanInput source="status" label="Trạng thái" defaultValue={false} fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DateInput source="createdDate" label="Ngày tạo" disabled fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextInput source="createdBy.username" label="Người tạo" disabled fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <DateInput source="updatedDate" label="Ngày cập nhật" disabled fullWidth/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextInput source="updatedBy.username" label="Người cập nhật" disabled fullWidth/>
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
                            <ReferenceInput
                                label="Sản phẩm"
                                source="id"
                                reference="product"
                                sx={{maxWidth: '40em'}}
                            >
                                <AutocompleteInput label={"Sản phẩm"}
                                                   optionText={(choice: any) => `${choice.id} - ${choice.name}`}
                                                   sx={{width: '40em'}}/>
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    )
};

export default PromotionEdit;

