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
import {Grid} from "@mui/material";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>{record.name}</span> : null;
};
export const ProductShow = (props: any) => {
    return (
        <Edit title={<ProductTitle/>}>
            <TabbedForm>
                <TabbedForm.Tab
                    label="Ảnh"
                    sx={{maxWidth: '40em'}}
                >
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="imageUrl" label="Thumbnail"/>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <ImageField source="imgProducts" src="url" label="image"/>
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
                        <SimpleFormIterator>
                            <TextInput source="color" label="Màu sắc"/>
                            <ArrayInput sx={{marginLeft: 10}} source={`sizes`} label={`Sizes`}>
                                <SimpleFormIterator inline>
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
