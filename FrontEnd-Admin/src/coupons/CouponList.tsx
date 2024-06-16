import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField, DeleteButton,
    EditButton,
    ExportButton,
    FilterButton, FunctionField,
    List, NullableBooleanInput, NumberField,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar, useListController,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import MobileCouponGrid from "./MobileCouponGrid";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import {checkPermission} from "../helpers";
import LinkToProducts from "../categories/LinkToProducts";

const ListActions = ({permissions}: any) => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {permissions && checkPermission(permissions, "COUPON_CREATE") && <CreateButton/>}
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = () => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
    <NullableBooleanInput label="Trạng thái" source="status"/>,
    <NullableBooleanInput label="Hết hạn" source="expired"/>
];

const CouponList = () => {
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
            pagination={false}
            component="div"
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
            {isSmall ? <MobileCouponGrid permissions={permissions}/> :
                <DatagridConfigurable empty={<div>Hiện không có mã giảm giá nào</div>} bulkActionButtons={false}>
                    < TextField
                        source="id"
                        label={"Mã"}
                    />
                    <TextField source="name" label={"Tên"}/>
                    <TextField source="couponCode" label={"Mã giảm"}/>
                    <DateField source="expiredDate" label={"Ngày hết hạn"}/>
                    <BooleanField source="status" label={"Trạng thái"}/>
                    <NumberField source="price" label={"Giảm giá"}/>
                    <FunctionField
                        label="SL còn lại"
                        render={(record: any) => (
                            record &&
                            <span>{record.quantity}</span>
                        )}
                    />
                    <ArrayField label={"Hành động"} textAlign={'center'}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                            {permissions && checkPermission(permissions, "COUPON_UPDATE") &&
                                <EditButton sx={{lineHeight: '1.75 !important'}}/>}
                            {permissions && checkPermission(permissions, "COUPON_DELETE") &&
                                <DeleteButton mutationMode={'pessimistic'} sx={{lineHeight: '1.75 !important'}}/>}
                        </div>
                    </ArrayField>
                </DatagridConfigurable>}
        </List>
    )
}


export default CouponList;
