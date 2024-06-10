import {
    SimpleForm,
    TextInput,
    DateField,
    required, BooleanInput, ImageInput, ImageField, Create
} from 'react-admin';
import React from "react";
import {Box} from "@mui/material";

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const BlogCreate = () => {
    return (
        <Create>
            <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 1 }}>
                <SimpleForm >
                    <ImageInput name="thumbnail" source="thumbnail" label="Thumbnail">
                        <ImageField source="thumbnail"/>
                    </ImageInput>
                    <TextInput source="title" label="Tên bài viết" validate={required()} sx={{ mb: 1 }} fullWidth/>
                    <TextInput source="description" label="Mô tả ngắn" multiline validate={required()} sx={{ mb: 1 }} fullWidth/>
                    <BooleanInput source="status" label="Trạng thái" defaultValue={false} sx={{ mb: 1 }}/>
                    <RichTextInput source="content" label="Nội dung" validate={required()} sx={{ mb: 1 }} fullWidth/>
                    <DateField source="releaseDate" label="Ngày tạo" sx={{ mb: 1 }}/>
                </SimpleForm>
            </Box>
        </Create>
    )
};
