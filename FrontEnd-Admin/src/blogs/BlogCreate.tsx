import {
    SimpleForm,
    TextInput,
    DateField,
    required, BooleanInput, ImageInput, ImageField, Create, useNotify
} from 'react-admin';
import React, {useEffect} from "react";
import {Box} from "@mui/material";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const BlogCreate = () => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "BLOG_CREATE")) {
                window.location.replace("/#/blog");
                notify("Permission denied", {type: 'error'});
            }
        })
    }, [])
    return (
        <Create>
            <Box sx={{bgcolor: '#f8f9fa', p: 2, borderRadius: 1}}>
                <SimpleForm>
                    <ImageInput name="thumbnail" source="thumbnail" label="Ảnh mô tả" accept="image/*"
                                placeholder={"Tải ảnh hoặc kéo thả vào đây"}>
                        <ImageField source="src" sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "5px",
                            marginBottom: "5px",
                            maxHeight: "100px"
                        }}/>
                    </ImageInput>
                    <TextInput source="title" label="Tên bài viết" validate={required()} sx={{mb: 1}} fullWidth/>
                    <TextInput source="description" label="Mô tả ngắn" multiline validate={required()} sx={{mb: 1}}
                               fullWidth/>
                    <BooleanInput source="status" label="Trạng thái" defaultValue={false} sx={{mb: 1}}/>
                    <RichTextInput source="content" label="Nội dung" validate={required()} sx={{mb: 1}} fullWidth/>
                    <DateField source="releaseDate" label="Ngày tạo" sx={{mb: 1}}/>
                </SimpleForm>
            </Box>
        </Create>
    )
};
