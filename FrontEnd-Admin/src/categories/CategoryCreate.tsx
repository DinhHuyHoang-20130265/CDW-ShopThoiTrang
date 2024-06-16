import {
    SimpleForm,
    TextInput,
    DateField,
    required, useGetList, SelectInput, SelectArrayInputProps, BooleanInput, Create, useNotify
} from 'react-admin';
import React, {useEffect, useState} from "react";
import {Category} from "../types";
import {checkPermission} from "../helpers";
import {authProvider} from "../authProvider";

export const CategoryCreate = (props: SelectArrayInputProps) => {
    const notify = useNotify();
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            if (response && !checkPermission(response.permissions, "CATEGORY_CREATE")) {
                window.location.replace("/#/category");
                notify("Permission denied", {type: 'error'});
            }
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
