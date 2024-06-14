import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton, FunctionField,
    List, NullableBooleanInput, NumberField, RaThemeOptions,
    SelectColumnsButton,
    TextField,
    TextInput, ThemeSetter, ThemeType,
    TopToolbar, useListController, useTheme,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import MobileCouponGrid from "./MobileCouponGrid";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <CreateButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = () => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
    <NullableBooleanInput label="Trạng thái" source="status"/>,
    <NullableBooleanInput label="Hết hạn" source="expired"/>
];

const CouponList = () => {
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
            actions={<ListActions/>}
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
            {isSmall ? <MobileCouponGrid/> :
                <DatagridConfigurable empty={<div>Hiện không có mã giảm giá nào</div>}>
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
                    <EditButton/>
                </DatagridConfigurable>}
        </List>
    )
}


export default CouponList;
