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
    List, NullableBooleanInput, NumberField, RaThemeOptions,
    SelectColumnsButton,
    TextField,
    TextInput, ThemeSetter, ThemeType,
    TopToolbar, useListController, useTheme,
} from 'react-admin';
import {Theme, useMediaQuery} from "@mui/material";
import MobilePromotionGrid from "./MobilePromotionGrid";
import {authProvider} from "../authProvider";
import {useEffect} from "react";
import LinkToProducts from "../categories/LinkToProducts";
import {checkPermission} from "../helpers";

const ListActions = ({permissions}: any) => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        {permissions && checkPermission(permissions, "PROMOTION_CREATE") && <CreateButton/>}
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = () => [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
    <NullableBooleanInput label="Trạng thái" source="status"/>
];

const PromotionList = () => {
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


    const checkPromotionStatus = (promotion: any) => {
        const currentDate = new Date();
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);

        if (currentDate < startDate) {
            return 'Chưa diễn ra';
        } else if (currentDate >= startDate && currentDate <= endDate) {
            return 'Đang diễn ra';
        } else {
            return 'Đã kết thúc';
        }
    };
    return (
        data ? (
                <List
                    sort={{field: 'name', order: 'ASC'}}
                    perPage={20}
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
                    {isXsmall ? <MobilePromotionGrid permissions={permissions}/> :
                        <DatagridConfigurable bulkActionButtons={false}>
                            < TextField
                                source="id"
                                label={"Mã"}
                            />
                            <TextField source="name" label={"Tên"}/>
                            <DateField source="startDate" label={"Ngày bắt đầu"}/>
                            <DateField source="endDate" label={"Ngày kết thúc"}/>
                            <BooleanField source="status" label={"Trạng thái"}/>
                            <FunctionField
                                label="Hoạt động"
                                render={(record: any) => (
                                    <span>{checkPromotionStatus(record)}</span>
                                )}
                            />
                            <NumberField source="discount" label={"Giảm giá"}/>
                            <FunctionField
                                label="SL sản phẩm"
                                render={(record: any) => (
                                    record.products &&
                                    <span>{record.products.length}</span>
                                )}
                            />
                            <ArrayField label={"Hành động"} textAlign={'center'}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly'
                                }}>
                                    {permissions && checkPermission(permissions, "PROMOTION_UPDATE") &&
                                        <EditButton sx={{lineHeight: '1.75 !important'}}/>}
                                    {permissions && checkPermission(permissions, "PROMOTION_DELETE") &&
                                        <DeleteButton mutationMode={'pessimistic'} sx={{lineHeight: '1.75 !important'}}/>}
                                </div>
                            </ArrayField>
                        </DatagridConfigurable>}
                </List>
            ) :
            <div>Không có khuyến mãi</div>
    )
}


export default PromotionList;
