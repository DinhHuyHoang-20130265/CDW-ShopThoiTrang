import {
    Edit,
    SimpleForm,
    TextInput,
    DateField,
    required, BooleanInput, ImageInput, ImageField
} from 'react-admin';
import React from "react";
import {Box} from "@mui/material";
import {useWatch} from "react-hook-form";

export const ReturnedImg = () => {
    const isReturned = useWatch({name: 'thumbnail'});
    return isReturned ?
        <>
            <ImageField source="thumbnail" title="title" sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                marginBottom: "5px",
                maxHeight: "100px"
            }}/>
            <ImageInput source="newthumbnail" accept="image/*"
                        placeholder={<p>Add new Avt Img</p>} label={"Thêm ảnh đại diện mới"}>
                <ImageField source="src" title="title" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput source="thumbnail" accept="image/*"
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

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const BlogEdit = () => {
    return (
        <Edit>
            <Box sx={{bgcolor: '#f8f9fa', p: 2, borderRadius: 1}}>
                <SimpleForm sx={{bgcolor: 'white', p: 2, borderRadius: 1}}>
                    <TextInput disabled label="Id" source="id"/>
                    <ReturnedImg/>
                    <TextInput source="title" label="Tên bài viết" validate={required()} sx={{mb: 1}} fullWidth/>
                    <TextInput source="description" label="Mô tả ngắn" multiline validate={required()} sx={{mb: 1}}
                               fullWidth/>
                    <BooleanInput source="status" label="Trạng thái" defaultValue={false} sx={{mb: 1}}/>
                    <RichTextInput source="content" label="Nội dung" validate={required()} sx={{mb: 1}} fullWidth/>
                    <DateField source="releaseDate" label="Ngày tạo" sx={{mb: 1}}/>
                </SimpleForm>
            </Box>
        </Edit>
    )
};
