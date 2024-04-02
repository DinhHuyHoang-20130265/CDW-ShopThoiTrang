import * as React from 'react';
import {
    ArrayInput,
    AutocompleteArrayInput, BooleanInput, NumberField,
    NumberInput,
    ReferenceInput,
    required,
    SelectInput, SimpleFormIterator,
    TextInput, useGetList,
} from 'react-admin';
import {InputAdornment, Grid} from '@mui/material';
import {Category} from "../types";
import {useEffect, useState} from "react";
import {RichTextInput} from "ra-input-rich-text";


export const ProductEditDetails = () => {
    const [categories, setCategories] = useState([]);

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
                <TextInput source="description" validate={req}  multiline fullWidth />
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
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={8}>
                <AutocompleteArrayInput source="categories" choices={categories} label={"Danh mục"} fullWidth/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <RichTextInput source="content" label="" validate={req} />
            </Grid>
        </Grid>)
};

const req = [required()];