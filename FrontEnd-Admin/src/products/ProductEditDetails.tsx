import * as React from 'react';
import {
    BooleanInput,
    Edit,
    NumberInput,
    required, SelectArrayInput, SelectArrayInputProps,
    TextInput, useGetList,
} from 'react-admin';
import {InputAdornment, Grid} from '@mui/material';
import {Category} from "../types";
import {useEffect, useState} from "react";
import {RichTextInput} from "ra-input-rich-text";


export const ProductEditDetails = (props: SelectArrayInputProps) => {
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
        <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
                <TextInput source="name" fullWidth validate={req}/>
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextInput source="description" validate={req} multiline fullWidth/>
            </Grid>

            <Grid item xs={12} sm={12}>
                <BooleanInput source={"status"} label={"Trạng thái"}/>
            </Grid>

            <Grid item xs={12} sm={4}>
                <NumberInput
                    source="price.price"
                    label={"Giá"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">đ</InputAdornment>
                        ),
                    }}
                    validate={req}
                    fullWidth/>
            </Grid>
            <Grid item xs={12} sm={8}>

                <SelectArrayInput  {...props} label="Danh mục" source="categoriesIds"
                                   optionValue={"id"}
                                   choices={categories} fullWidth validate={req}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <RichTextInput source="content" label="Mô tả" validate={req}/>
            </Grid>
        </Grid>
    )
};

const req = [required()];
