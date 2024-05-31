import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    ArrayInput,
    NumberInput,
    SimpleFormIterator, Create
} from 'react-admin';
import * as React from "react";

const ImportInvoiceCreate = () => (
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
);

export default ImportInvoiceCreate;