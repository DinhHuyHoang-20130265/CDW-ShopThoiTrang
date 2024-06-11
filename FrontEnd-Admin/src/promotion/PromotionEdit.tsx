import {
    ArrayInput, AutocompleteInput,
    BooleanInput, DateInput,
    Edit, ImageField, ImageInput, NullableBooleanInput, NumberInput, ReferenceInput,
    required, SimpleFormIterator, TabbedForm,
    TextInput, useEditContext, useGetList,
} from "react-admin";
import {Grid, InputAdornment, Typography} from "@mui/material";
import React from "react";
import {Category, Product} from "../types";
import {useWatch} from "react-hook-form";


export const ReturnedImg = () => {
    const isReturned = useWatch({name: 'thumnail'});
    return isReturned ?
        <>
            <ImageField source="userInfo.avtUrl" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="userInfo.avt" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh đại diện mới"}>
                <ImageField source="src" title="title" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput source="userInfo.avt" accept="image/*"
                          placeholder={<p>Drop your img file here</p>}>
            <ImageField source="src" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
        </ImageInput>;
};

const PromotionEdit = () => {

    const {record, isLoading}: any = useEditContext();
    console.log(record);

    const {data} = useGetList<Product>('product', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    console.log(data);
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
                            <ImageField source={"thumbnail"} label="Ảnh" sx={{margin: 'auto'}}/>
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
                            <ReferenceInput source="id" reference="product" label="Sản phẩm" fullWidth>
                                <AutocompleteInput optionText="name" sx={{width: '40em'}}/>
                            </ReferenceInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    )
};

export default PromotionEdit;

