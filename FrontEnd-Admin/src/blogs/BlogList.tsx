import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton, ImageField,
    List,
    Pagination,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import MobileBlogGrid from "./MobileBlogGrid";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import {checkPermission} from "../helpers";

const ListActions = (props: any) => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {props.permissions && checkPermission(props.permissions, "BLOG_CREATE") && <CreateButton/>}
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Tìm kiếm..." source="title" alwaysOn/>
];

const BlogList = () => {
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            setPermissions(response.permissions)
        })
    }, [])
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    return (
        <List
            sort={{field: 'title', order: 'ASC'}}
            perPage={10}
            pagination={false}
            component="div"
            actions={<ListActions permissions={permissions}/>}
            filters={postFilters}
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
            {isSmall ? <MobileBlogGrid permissions={permissions}/> :
                <DatagridConfigurable>
                    <TextField source="id" label="ID"/>
                    <ImageField source="thumbnail" label="Ảnh"/>
                    <TextField source="title" label={"Tiêu đề"}/>
                    <TextField source="description" label={"Mô tả"} sx={{width: "200px"}}/>
                    <DateField source="createDate" label="Ngày tạo"/>
                    <BooleanField source="status" label="Trạng thái"/>

                    <ArrayField label={"Hành động"}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                            {permissions && checkPermission(permissions, "BLOG_UPDATE") && <EditButton label={"Sửa"}/>}
                        </div>
                    </ArrayField>
                </DatagridConfigurable>
            }
            <Pagination/>
        </List>
    )
};


export default BlogList;
