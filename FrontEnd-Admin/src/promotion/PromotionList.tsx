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
    <NullableBooleanInput label="Trạng thái" source="status"/>
];

const PromotionList = () => {
        const {data, isLoading}: any = useListController();
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
                        <DatagridConfigurable>
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
                            <EditButton/>
                        </DatagridConfigurable>
                    </List>
                ) :
                <div>Không có khuyến mãi</div>
        )
            ;
    }
;


export default PromotionList;
