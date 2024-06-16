import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    DatagridConfigurable,
    DateField,
    EditButton,
    FilterButton, FunctionField,
    List, NullableBooleanInput,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar, useListController,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import {checkPermission} from "../helpers";
import ContactMobileGrid from "./ContactMobileGrid";
import ReplyIcon from "@mui/icons-material/Reply";

const ListActions = ({permissions}: any) => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
    </TopToolbar>
);

const postFilters = () => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
    <NullableBooleanInput label="Trạng thái" source="status"/>
];

const ContactList = () => {
    const [permissions, setPermissions] = React.useState<any>(null)
    const fetch: any = authProvider.getPermissions(null);
    useEffect(() => {
        fetch.then((response: any) => {
            setPermissions(response.permissions)
        })
    }, [])
    const {data, isLoading}: any = useListController();
    const isXsmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    if (isLoading) return null;

    return (
        <List
            sort={{field: 'name', order: 'ASC'}}
            perPage={20}
            component="div"
            empty={false}
            actions={<ListActions permissions={permissions}/>}
            filters={postFilters()}
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
            {isXsmall ? <ContactMobileGrid permissions={permissions}/> :
                <DatagridConfigurable bulkActionButtons={false} rowClick={'show'} empty={
                    <div style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }
                    }>
                        <p style={
                            {
                                fontSize: '28px',
                                color: '#8f8f8f'
                            }
                        }>Hiện không có dữ liệu</p>
                    </div>
                }>
                    < TextField
                        source="id"
                        label={"Mã"}
                    />
                    <TextField source="name" label={"Tên"}/>
                    <TextField source="email" label={"email"}/>
                    <DateField source="createdDate" label={"Ngày gửi"}/>
                    <BooleanField source="status" label={"Trạng thái"}/>
                    <FunctionField
                        source="status"
                        sx={{display: "flex", flexDirection: "column"}}
                        label="Hành động"
                        render={(record: any) => (
                            record && permissions && checkPermission(permissions, "CONTACT_UPDATE") && !record.status &&
                            <ArrayField label={"Hành động"} textAlign={'center'}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <EditButton label={"Reply"} icon={<ReplyIcon/>}/>
                                </div>
                            </ArrayField>
                        )}
                    />
                </DatagridConfigurable>}
        </List>
    )
}


export default ContactList;
