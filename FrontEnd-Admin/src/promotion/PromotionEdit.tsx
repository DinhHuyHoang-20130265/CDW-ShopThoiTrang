import {
    ArrayInput, AutocompleteInput,
    BooleanInput, DateInput, DeleteButton,
    Edit, ImageField, ImageInput, NullableBooleanInput, NumberInput, ReferenceInput,
    required, SaveButton, SimpleFormIterator, TabbedForm,
    TextInput, Toolbar, useEditContext, useGetList, useNotify,
} from "react-admin";
import {Grid, InputAdornment, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {Category, Product} from "../types";
import {useWatch} from "react-hook-form";
import {checkPermission} from "../helpers";
import {authProvider} from "../authProvider";


export const ReturnedImg = () => {
    const isReturned = useWatch({name: 'thumbnail'});
    return isReturned ?
        <>
            <ImageField source="thumbnail" title="thumbnail" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="newthumbnail" accept="image/*"
                        placeholder={<p>Thay đổi thumbnail</p>} label={"Thay đổi thumbnail"}>
                <ImageField source="src" title="title" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput source="thumbnail" accept="image/*"
                          placeholder={<p>Thêm thumbnail</p>}>
            <ImageField source="src" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
        </ImageInput>;
};

const PromotionEdit = (props: any) => {
    const notify = useNotify();
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "PROMOTION_UPDATE")) {
                window.location.replace("/#/promotion");
                notify("Permission denied", {type: 'error'});
            } else
                setPermissions(response.permissions)
        })
    }, [props]);
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
            <TabbedForm warnWhenUnsavedChanges
                        toolbar={<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <SaveButton/>
                            {permissions && checkPermission(permissions, "PROMOTION_DELETE") &&
                                <DeleteButton mutationMode="pessimistic"/>}
                        </Toolbar>}>
                <TabbedForm.Tab
                    label="Thông tin khuyến mãi"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ReturnedImg/>
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

