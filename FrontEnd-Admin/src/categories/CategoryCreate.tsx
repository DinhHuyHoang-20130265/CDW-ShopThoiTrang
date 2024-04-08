import {
    Edit,
    SimpleForm,
    TextInput,
    DateField,
    required, SelectField, useGetList, SelectInput, SelectArrayInputProps, BooleanInput, Create
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category} from "../types";

export const CategoryCreate = (props: SelectArrayInputProps) => {
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
        <Create>
            <SimpleForm>
                <TextInput source="name" validate={required()}/>
                <SelectInput source="parentId" choices={categories}/>
                <BooleanInput source="status" label="Trạng thái" defaultValue={false}/>
                <DateField source="releaseDate" label="Ngày tạo"/>

            </SimpleForm>
        </Create>
    )
};