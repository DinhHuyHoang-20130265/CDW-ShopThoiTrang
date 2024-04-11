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
    required, SelectField, useGetList, SelectInput, SelectArrayInputProps, BooleanInput
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category} from "../types";
import {Grid} from "@mui/material";

export const CategoryEdit = (props: SelectArrayInputProps) => {
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
            <SimpleForm>
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
                        <DateField source="releaseDate" label="Ngày tạo" />
                    </Grid>

                </Grid>
            </SimpleForm>
        </Edit>
    )
};