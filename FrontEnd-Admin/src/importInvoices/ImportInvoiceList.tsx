import * as React from 'react';
import {
    ArrayInput,
    Create,
    DatagridConfigurable,
    DateField,
    ExportButton,
    FilterButton,
    List,
    NumberField, NumberInput,
    Pagination,
    SelectColumnsButton,
    SimpleForm, SimpleFormIterator,
    TextField,
    TextInput,
    TopToolbar
} from 'react-admin';
import {Stack} from '@mui/material';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <FilterButton/>
        <ExportButton label={"Xuất File"}/>
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
];

const ImportInvoiceList = () => {
    return (
        <Stack spacing={4}>
            <Create>
                <SimpleForm>
                    <ArrayInput source="ImportInvoiceRequest" label={"Nhập hàng"}>
                        <SimpleFormIterator inline>
                            <TextInput source="idProduct" helperText={false} label={"Mã sản phẩm"} />
                            <TextInput source="idVariation" helperText={false} label={"Mã màu"}/>
                            <TextInput source="idSize" helperText={false} label={"Mã size"}/>
                            <NumberInput source="quantity" helperText={false} label={"Số lượng"}/>
                            <NumberInput step={1000} source="importPrice" helperText={false} label={"Giá nhập"}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Create>
            <List
                sort={{field: 'id', order: 'ASC'}}
                perPage={10}
                pagination={false}
                component="div"
                actions={<ListActions/>}
                filters={postFilters}
            >
                <DatagridConfigurable>
                    <TextField source="id"/>
                    <TextField source="product.name" label={"Tên"}/>
                    <TextField source="variation.color" label={"Màu sắc"}/>
                    <TextField source="size.size" label={"Kích thước"}/>
                    <NumberField source="importPrice" label={"Giá nhập"}/>
                    <NumberField source="quantity" label={"Số lượng"}/>
                    <DateField source="importDate" label={"Ngày nhập"}/>

                </DatagridConfigurable>
                <Pagination/>
            </List>
        </Stack>
    )
};


export default ImportInvoiceList;
