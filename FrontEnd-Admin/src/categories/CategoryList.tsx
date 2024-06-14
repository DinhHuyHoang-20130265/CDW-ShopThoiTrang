import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton,
    List,
    Pagination,
    SelectColumnsButton, SelectField,
    TextField,
    TextInput,
    TopToolbar, useGetList,
} from 'react-admin';
import {useEffect, useState} from "react";
import {Category} from "../types";
import LinkToProducts from "./LinkToProducts";
import {Theme, useMediaQuery} from "@mui/material";
import MobileCategoryGrid from "./MobileCategoryGrid";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = (cate: any) => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>
];

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <List
            sort={{field: 'name', order: 'ASC'}}
            perPage={20}
            pagination={false}
            component="div"
            actions={<ListActions/>}
            filters={postFilters(categories)}
            sx={{
                '@media(max-width:900px)': {
                    '.RaList-main > .RaList-actions': {
                        display: 'block',
                        '.MuiToolbar-root.MuiToolbar-dense': {
                            float: 'left'
                        }
                    }
                },
                '@media(max-width:600px)': {
                    '.RaList-main > .RaList-actions': {
                        display: 'block',
                        '.MuiToolbar-root.MuiToolbar-regular': {
                            float: 'left'
                        }
                    }
                }
            }}
        >
            {isXsmall ? <MobileCategoryGrid/> :
                <DatagridConfigurable>
                    <TextField source="id" label={"Id"}/>
                    <TextField source="name" label={"Tên"}/>
                    <SelectField source="parentId" choices={categories} label={"Danh mục cha"}/>
                    <DateField source="releaseDate" label={"Ngày tạo"}/>
                    <BooleanField source="status" label="Trạng thái"/>
                    <ArrayField label={"Hành động"} textAlign={'center'}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                            <LinkToProducts/>
                            <EditButton sx={{lineHeight: '1.75 !important'}}/>
                        </div>
                    </ArrayField>
                </DatagridConfigurable>
            }
            <Pagination/>
        </List>
    )
};


export default CategoryList;
