import * as React from 'react';
import {
    BooleanField,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    ExportButton,
    FilterButton, FunctionField,
    List,
    Pagination,
    SelectColumnsButton, SelectField,
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
    <TextInput label="Tên" source="name"/>,
    <BooleanField label="Trạng thái" source="status"/>
];

const PromotionList = () => {
    const { data, isLoading }: any = useListController();

    if (isLoading) return null;

    const isPromotionExpired = (promotion: any) => {
        const currentDate = new Date();
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);
        return currentDate >= startDate && currentDate <= endDate;
    };

    return (
        data ? (
            <List
                sort={{ field: 'name', order: 'ASC' }}
                perPage={20}
                pagination={false}
                component="div"
                actions={<ListActions />}
                filters={postFilters()}
            >
                <DatagridConfigurable>
                    <TextField source="id" label={"Id"} />
                    <TextField source="name" label={"Tên"} />
                    <TextField source="description" label={"Mô tả"} />
                    <DateField source="startDate" label={"Ngày bắt đầu"} />
                    <DateField source="endDate" label={"Ngày kết thúc"} />
                    <BooleanField source="status" label={"Trạng thái"} />
                    <FunctionField
                        label="Hoạt động"
                        render={(record : any) => (
                            <span>{isPromotionExpired(record) ? 'Hoạt động' : 'Hết hạn'}</span>
                        )}
                    />
                    <EditButton />
                </DatagridConfigurable>
            </List>
        ) : <div>Không có khuyến mãi</div>
    );
};


export default PromotionList;
