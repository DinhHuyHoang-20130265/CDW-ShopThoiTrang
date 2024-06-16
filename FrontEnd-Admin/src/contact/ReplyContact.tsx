import {
    Edit,
    SimpleForm,
    TextInput,
    required, SaveButton, useNotify, DateInput, TopToolbar
} from 'react-admin';
import React, {useEffect} from "react";
import {authProvider} from "../authProvider";
import {checkPermission} from "../helpers";
import ReplyIcon from "@mui/icons-material/Reply";
import {Grid} from "@mui/material";

const RichTextInput = React.lazy(() =>
    import('ra-input-rich-text').then(module => ({
        default: module.RichTextInput,
    }))
);
export const ReplyContact = (props: any) => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "CONTACT_UPDATE")) {
                window.location.replace("/#/contact");
                notify("Permission denied", {type: 'error'});
            }
        })
    }, [props]);
    return (
        <Edit>
            <SimpleForm sx={{bgcolor: 'white', p: 2, borderRadius: 1}}
                        toolbar={<TopToolbar sx={{float: 'left'}}><SaveButton label={"Reply"} icon={<ReplyIcon/>}/></TopToolbar>}>
                <Grid container
                      direction="column">

                    <TextInput source="name" label="Tên người gửi" validate={required()} sx={{mb: 1}}
                               disabled/>
                    <TextInput source="email" label="Email" validate={required()} sx={{mb: 1}} disabled/>
                    <DateInput source="createdDate" label="Ngày gửi" sx={{mb: 1}} disabled/>
                    <TextInput source="message" label="Nội dung" fullWidth={true} sx={{mb: 1}} disabled/>

                    <Grid item xs={12} sm={12} md={6}>
                        <RichTextInput source="content" label="Nội dung" validate={required()} sx={{mb: 1}}
                                       fullWidth/>
                    </Grid>
                </Grid>
            </SimpleForm>
        </Edit>
    )
};
