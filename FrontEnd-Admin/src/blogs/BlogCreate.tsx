import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    ReferenceManyField,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    required, SelectField, useGetList, SelectInput, SelectArrayInputProps, BooleanInput, ImageInput, ImageField, Create
} from 'react-admin';
import React from "react";
const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const BlogCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ImageInput name="thumbnail" source="thumbnail" label="Thumbnail">
                    <ImageField source="thumbnail"/>
                </ImageInput>
                <TextInput source="title" validate={required()}/>
                <TextInput source="description" multiline validate={required()}/>
                <BooleanInput  source="status" label="Trạng thái" defaultValue={false}/>
                <RichTextInput source="content" label="Nội dung"/>
                <DateField source="releaseDate" label="Ngày tạo"/>

            </SimpleForm>
        </Create>
    )
};