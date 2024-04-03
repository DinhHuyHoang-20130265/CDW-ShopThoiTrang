import * as React from 'react';
import {
    ArrayInput,
    AutocompleteArrayInput, BooleanInput, NumberField,
    NumberInput, ReferenceArrayInput,
    ReferenceInput,
    required, SelectArrayInput,
    SelectInput, SimpleFormIterator,
    TextInput, useGetList, useRecordContext,
} from 'react-admin';
import {InputAdornment, Grid} from '@mui/material';
import {Category, Product} from "../types";
import {useEffect, useState} from "react";
import {RichTextInput} from "ra-input-rich-text";


export const ProductEditDetails = () => {
    const record: any = useRecordContext<Product>();
    const [categories, setCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
        if (record) {
            setCategoriesSelected(record.categories);
        }
    }, [data, record]);

    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={12} sm={12}>
                <TextInput source="name" fullWidth validate={req} name={"name"}/>
            </Grid>

            <Grid item xs={12} sm={12}>
                <TextInput source="description" validate={req} multiline fullWidth name={"description"}/>
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
                <ReferenceArrayInput label="chọn" source="categories" reference="category" name={"list_cate"}>
                    <AutocompleteArrayInput source="categories" choices={categories}
                                            label={"Danh mục"} fullWidth name={"categories"} optionText={"name"}/>
                </ReferenceArrayInput>

            </Grid>
            <Grid item xs={12} sm={12}>
                <RichTextInput source="content" label="" validate={req} name={"content"}/>
            </Grid>
        </Grid>)
};

const req = [required()];
