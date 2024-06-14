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
    ShowButton,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import MobileBlogGrid from "./MobileBlogGrid";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Tìm kiếm..." source="title" alwaysOn/>
];

const BlogList = () => {
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
            actions={<ListActions/>}
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
            {isSmall ? <MobileBlogGrid/> :
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
                            <EditButton label={"Sửa"}/>
                            <ShowButton label={"Xem"}/>
                        </div>
                    </ArrayField>
                </DatagridConfigurable>
            }
            <Pagination/>
        </List>
    )
};


export default BlogList;
