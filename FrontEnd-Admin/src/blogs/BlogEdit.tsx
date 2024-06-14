import {
    Edit,
    SimpleForm,
    TextInput,
    DateField,
    required, BooleanInput, ImageInput, ImageField
} from 'react-admin';
import React from "react";
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
                        placeholder={<p>Thêm ảnh mới</p>} label={"Thêm ảnh mới"} fullWidth={false}>
                <ImageField source="src" title="title" sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5px",
                    marginBottom: "5px",
                    maxHeight: "100px"
                }}/>
            </ImageInput>
        </> : <ImageInput source="thumbnail" accept="image/*"
                          placeholder={<p>Thêm ảnh tại đây</p>}>
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
            <SimpleForm sx={{bgcolor: 'white', p: 2, borderRadius: 1}}>
                <TextInput disabled label="Id" source="id"/>
                <ReturnedImg/>
                <TextInput source="title" label="Tên bài viết" validate={required()} sx={{mb: 1}}/>
                <TextInput source="description" label="Mô tả ngắn" multiline validate={required()} sx={{mb: 1}}
                           fullWidth/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false} sx={{mb: 1}}/>
                <RichTextInput source="content" label="Nội dung" validate={required()} fullWidth={true}
                               sx={{
                                   mb: 1,
                                   '#content': {overflowX: 'scroll', width: '100%'}
                               }}/>
                <DateField source="releaseDate" label="Ngày tạo" sx={{mb: 1}}/>
            </SimpleForm>
        </Edit>
    )
};
