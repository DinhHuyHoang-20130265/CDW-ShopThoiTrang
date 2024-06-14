import * as React from 'react';
import {
    CreateButton,
    DatagridConfigurable,
    DateField,
    FilterButton, FunctionField,
    List,
    NumberField,
    Pagination,
    SelectColumnsButton,
    TextField,
    TextInput,
    TopToolbar, useCreate, useListController
} from 'react-admin';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Stack} from '@mui/material';
import ImportInvoiceShow from "./ImportInvoiceShow";
import * as XLSX from 'xlsx';
import {ChangeEvent, useRef, useState} from "react";

interface Field {
    label: string;
    value: string;
}

const ListActions = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [columns, setColumns] = useState<string[]>([]);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [data, setData] = useState<string[][]>([]);
    const [dataMapping, setDataMapping] = useState<any[]>([]);
    const [create, {isLoading, error}] = useCreate('import-invoice', {data: {importInvoiceDetails: dataMapping}});
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, {type: 'array'});
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json: any = XLSX.utils.sheet_to_json(sheet, {header: 1});
            setColumns(json[0]);
            setData(json.slice(1));
            setOpen(true);
        } catch (error) {
            console.error("Error reading file:", error);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleMappingChange = (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setMapping({...mapping, [field]: event.target.value as string});
    };

    const handleImport = () => {
        const mappedData = data.map(row => {
            const mappedRow: Record<string, string> = {};
            Object.keys(mapping).forEach((field) => {
                const columnIndex = columns.indexOf(mapping[field]);
                mappedRow[field] = row[columnIndex];
            });
            return mappedRow;
        });

        setDataMapping(mappedData);

        // Gọi hàm create với dữ liệu đã được ánh xạ
        create(
            'import-invoice',
            {data: {importInvoiceDetails: mappedData}},
            {
                onSuccess: () => {
                    setOpen(false);
                }
            }
        ).then(r => console.log(r));
    }

    const fields: Field[] = [
        {label: 'Mã Sản phẩm', value: 'product'},
        {label: 'Mã biến thể', value: 'variation'},
        {label: 'Mã kích cỡ', value: 'size'},
        {label: 'Số lượng', value: 'quantity'},
        {label: 'Giá nhập', value: 'importPrice'}
    ];

    return (
        <>
            <TopToolbar sx={{
                justifyContent: "center",
                alignItems: "center"

            }}>
                <SelectColumnsButton/>
                <FilterButton/>
                <CreateButton label={"Nhập hàng"}/>
                <Button onClick={handleImportClick}>Nhập hàng từ Excel</Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                />
            </TopToolbar>
            <Dialog sx={{
                '& .MuiDialog-paper': {
                    width: '50%'
                }

            }} open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Chọn cột tương ứng</DialogTitle>
                <DialogContent>
                    {fields.map(field => (
                        <div key={field.value} style={{marginBottom: '16px'}}>
                            <label>{field.label}</label>
                            <Select value={mapping[field.value] || ''}
                                    fullWidth
                                    onChange={event => handleMappingChange(field.value)(event as ChangeEvent<{
                                        value: unknown
                                    }>)}>
                                {columns.map(column => (
                                    <MenuItem key={column} value={column}>{column}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={handleImport} color="primary">Nhập</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const postFilters = [
    <TextInput label="Tìm kiếm..." source="q" alwaysOn/>,
];

const ImportInvoiceList = () => {
    const {data, isLoading}: any = useListController();

    if (isLoading) return null;

    const getQuantity = (record: any) => {
        let quantity = 0;
        for (let i = 0; i < record.importInvoiceDetails.length; i++) {
            quantity += record.importInvoiceDetails[i].quantity;
        }
        return quantity;
    }

    return (
        <List
            sort={{field: 'id', order: 'ASC'}}
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
            empty={false}
        >
            <DatagridConfigurable rowClick="expand" expandSingle expand={<ImportInvoiceShow/>} bulkActionButtons={false}
                                  empty={
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
                <TextField source="id" label={"Mã nhập hàng"}/>
                <DateField source="importDate" label={"Ngày nhập hàng"}/>
                <TextField source="importBy.username" label={"Người nhập hàng"}/>
                <FunctionField render={(record: any) => (
                    <span>{getQuantity(record)}</span>
                )} label={"Số lượng"}/>
                <NumberField source="totalPrice" label={"Tổng tiền"}/>
            </DatagridConfigurable>
            <Pagination/>
        </List>
    )
};


export default ImportInvoiceList;
