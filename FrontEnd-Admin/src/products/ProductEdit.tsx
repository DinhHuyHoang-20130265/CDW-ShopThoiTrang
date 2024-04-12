import {
    ImageField,
    Edit,
    TabbedForm,
    TextInput,
    useRecordContext,
    required,
    ImageInput,
    SimpleFormIterator, ArrayInput, NumberInput, BooleanInput,
} from "react-admin";
import React from "react";
import {Product} from "../types";
import {ProductEditDetails} from "./ProductEditDetails";
import {Grid, Typography} from "@mui/material";
import {useWatch} from "react-hook-form";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};

const ReturnedImgList = () => {
    const isReturned = useWatch({name: 'imgProducts'});
    return isReturned ?
        <>
            <ImageField source="imgProducts" src="url" label="imgProducts"/>
            <ImageInput source="imgProducts_new" accept="image/*" multiple={true}
                        placeholder={<p>Add new List Img</p>} label={"Thêm danh sách ảnh phụ mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"imgProducts"} source={"imgProducts"} multiple>
            <ImageField source="src" label="Danh sách ảnh phụ"/>
        </ImageInput>;
};
const ReturnedImg = () => {
    const isReturned = useWatch({name: 'imageUrl'});
    return isReturned ?
        <>
            <ImageField source="imageUrl" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="imageUrl_new" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh Thumnail mới"}>
                <ImageField source="src" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput name={"imageUrl"} source={"imageUrl"}>
            <ImageField source="src" label="Ảnh chính"/>
        </ImageInput>;
};

export const ProductEdit = (props: any) => {
    return (
        <Edit title={<ProductTitle/>}  hasShow={false}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Ảnh chính
                            </Typography>
                            <ReturnedImg/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách ảnh phụ
                            </Typography>
                            <ReturnedImgList/>
                        </Grid>
                    </Grid>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Chi tiết"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <ProductEditDetails/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Phân loại"
                    path="description"
                    sx={{maxWidth: '100%'}}
                >
                    <ArrayInput source={`variations`} label={`Biến thể`} fullWidth>
                        <SimpleFormIterator inline>
                            <NumberInput source={"id"} label={"ID"} disabled sx={{width: 80}}/>
                            <TextInput source="color" label="Màu sắc"/>
                            <ArrayInput sx={{marginLeft: 10}} source={`sizes`} label={`Sizes`}>
                                <SimpleFormIterator inline>
                                    <NumberInput source={"id"} label={"ID"} disabled sx={{width: 80}}/>
                                    <TextInput source="size" label="Kích cỡ"/>
                                    <NumberInput sx={{width: "20%"}} source="stock" label="Số lượng" disabled
                                    />
                                    <BooleanInput source="status" label="Trạng thái"/>
                                </SimpleFormIterator>
                            </ArrayInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </TabbedForm.Tab>

            </TabbedForm>
        </Edit>
    )
};

const req = [required()];
