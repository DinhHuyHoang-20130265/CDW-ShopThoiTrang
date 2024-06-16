import {
    SimpleForm,
    TextInput,
    required, SaveButton, DateInput, TopToolbar, Show
} from 'react-admin';
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import {Grid} from "@mui/material";

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const ShowContact = () => {
    return (
        <Show>
            <SimpleForm sx={{bgcolor: 'white', p: 2, borderRadius: 1}} toolbar={false}>
                <Grid container
                      direction="column">

                    <TextInput source="name" label="Tên người gửi" validate={required()} sx={{mb: 1}}
                               disabled/>
                    <TextInput source="email" label="Email" validate={required()} sx={{mb: 1}} disabled/>
                    <DateInput source="createdDate" label="Ngày gửi" sx={{mb: 1}} disabled/>
                    <TextInput source="message" label="Nội dung" fullWidth={true} sx={{mb: 1}} disabled/>

                    <Grid item xs={12} sm={12} md={6}>
                        <RichTextInput source="content" label="Nội dung" validate={required()} sx={{mb: 1}}
                                       fullWidth disabled/>
                    </Grid>
                </Grid>
            </SimpleForm>
        </Show>
    )
};
