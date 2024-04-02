import {
    NumberField,
    Show,
    TabbedShowLayout,
    TextField,
    ImageField,
    ReferenceField,
    ReferenceManyField,
    Datagrid,
    DateField,
    ReferenceManyCount,
    Edit,
    TabbedForm,
    TextInput,
    Pagination,
    useRecordContext,
    required,
    ImageInput,
    maxValue,
    SimpleFormIterator, ArrayInput, NumberInput, BooleanInput,
} from "react-admin";
import React from "react";
import {Product} from "../types";
import { Card, CardMedia } from '@mui/material';
import {ProductEditDetails} from "./ProductEditDetails";


const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);

const ProductTitle = () => {
    const record = useRecordContext<Product>();
    return record ? <span>Poster "{record.reference}"</span> : null;
};
export const ProductShow = () => (
    <Edit title={<ProductTitle />}>
        <TabbedForm>
            <TabbedForm.Tab
                label="Ảnh"
                sx={{ maxWidth: '40em' }}
            >
                <ImageInput multiple={false} source="imageUrl" label="Thumbnail" name={"imageUrl"}>
                    <ImageField source="imageUrl"  />
                </ImageInput>
                <ImageInput source="imgProducts" label="image" name={"imgProducts"}>
                    <ImageField source="url"  />
                </ImageInput>
            </TabbedForm.Tab>
            <TabbedForm.Tab
                label="Chi tiết"
                path="details"
                sx={{ maxWidth: '40em' }}
            >
                <ProductEditDetails />
            </TabbedForm.Tab>
            <TabbedForm.Tab
                label="Phân loại"
                path="description"
                sx={{ maxWidth: '100%' }}
            >
                <ArrayInput  source={`variations`} label={`Biến thể`} fullWidth>
                    <SimpleFormIterator >
                        <TextInput source="color" label="Màu sắc"/>
                        <ArrayInput sx={{marginLeft: 10}}  source={`sizes`} label={`Sizes`}>
                            <SimpleFormIterator inline>
                                <TextInput source="size" label="Màu sắc"/>
                                <NumberInput sx={{width: "20%"}} source="stock" label="Số lượng" disabled />
                                <BooleanInput source="status" label="Trạng thái"/>
                            </SimpleFormIterator>
                        </ArrayInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </TabbedForm.Tab>

        </TabbedForm>
    </Edit>
);

const req = [required()];
