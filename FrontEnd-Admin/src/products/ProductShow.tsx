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
                    <ImageInput multiple={false} source="imageUrl" label="Thumbnail" name={"imageUrl"}>
                        <ImageField source="imageUrl"/>
                    </ImageInput>
                    <ImageInput source="imgProducts" label="image" name={"imgProducts"}>
                        <ImageField source="url"/>
                    </ImageInput>
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
                    <ArrayInput source={`variations`} label={`Biến thể`} fullWidth name={"variations"}>
                        <SimpleFormIterator>
                            <TextInput source="color" label="Màu sắc" name={"color"}/>
                            <ArrayInput sx={{marginLeft: 10}} source={`sizes`} label={`Sizes`} name={"sizes"}>
                                <SimpleFormIterator inline>
                                    <TextInput source="size" label="Kích cỡ" name={"size"}/>
                                    <NumberInput sx={{width: "20%"}} source="stock" label="Số lượng" disabled
                                                 name={"stock"}/>
                                    <BooleanInput source="status" label="Trạng thái" name={"status"}/>
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
