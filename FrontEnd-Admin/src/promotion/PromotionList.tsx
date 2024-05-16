import * as React from 'react';
import {
    BooleanField, BooleanInput, Count,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton, FunctionField,
    List, NullableBooleanInput, NumberField,
    Pagination,
    SelectColumnsButton, SelectField, SelectInput,
    TextField,
    TextInput,
    TopToolbar, useGetList, useListContext, useListController,
} from 'react-admin';
import {useEffect, useState} from "react";

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

    const checkPromotionStatus = (promotion:any) => {
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
            >
                <DatagridConfigurable>
                    <TextField source="id" label={"Mã"}/>
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
                            <span>{record.products.length}</span>
                        )}
                    />
                    <EditButton/>
                </DatagridConfigurable>
            </List>
        ) : <div>Không có khuyến mãi</div>
    );
};


export default PromotionList;
