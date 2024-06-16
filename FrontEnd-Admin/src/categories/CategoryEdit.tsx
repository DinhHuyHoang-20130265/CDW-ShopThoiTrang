import {
    BooleanInput,
    DateField,
    DeleteButton,
    Edit,
    required,
    SaveButton,
    SelectArrayInputProps,
    SelectInput,
    SimpleForm,
    TextInput,
    Toolbar,
    useGetList, useNotify
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category} from "../types";
import {Grid} from "@mui/material";
import {checkPermission} from "../helpers";
import {authProvider} from "../authProvider";

export const CategoryEdit = (props: SelectArrayInputProps) => {
    const notify = useNotify();
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "CATEGORY_UPDATE")) {
                window.location.replace("/#/category");
                notify("Permission denied", {type: 'error'});
            } else
                setPermissions(response.permissions)
        })
    }, [props]);
    const [categories, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <Edit>
            <SimpleForm toolbar={<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <SaveButton/>
                {permissions && checkPermission(permissions, "CATEGORY_DELETE") &&
                    <DeleteButton mutationMode="pessimistic"/>}
            </Toolbar>}>
                <Grid container columnSpacing={2}>
                    <Grid item xs={6} sm={6}>
                        <TextInput disabled label="Id" source="id" fullWidth/>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <SelectInput source="parentId" choices={categories} fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextInput source="name" validate={required()} fullWidth/>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <BooleanInput source="status" label="Trạng thái" defaultValue={false} fullWidth/>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <DateField source="releaseDate" label="Ngày tạo"/>
                    </Grid>
                </Grid>
            </SimpleForm>
        </Edit>
    )
};
