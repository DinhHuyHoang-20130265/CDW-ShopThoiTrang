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
                <TextInput disabled label="Id" source="id"/>
                <TextInput source="name" validate={required()}/>
                <SelectInput source="parentId" choices={categories} />
                <BooleanInput  source="status" label="Trạng thái" defaultValue={false}/>
                <DateField source="releaseDate" label="Ngày tạo"/>

            </SimpleForm>
        </Edit>
    )
};