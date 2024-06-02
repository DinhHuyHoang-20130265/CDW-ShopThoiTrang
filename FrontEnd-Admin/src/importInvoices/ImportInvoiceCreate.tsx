import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    ArrayInput,
    NumberInput,
    SimpleFormIterator,
    Create,
    TabbedForm,
    FormTab,
    SelectInput,
    useGetList,
    AutocompleteInput,
    ReferenceInput,
    ArrayField, NumberField, TextField, required, useNotify
} from 'react-admin';
import * as React from "react";
import {Product} from "../types";
import {useState} from "react";

const ImportInvoiceCreate = () => {
    const addNotify= useNotify();
    const [product, setProduct] = useState<number | null>(null);
    const [variation, setVariation] = useState<number | null>(null);
    const [size, setSize] = useState<number | null>(null);

    const {data} = useGetList<Product>('product', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    const checkDataContains = (data: any, id: any) => {
        // Kiểm tra từng phần tử trong mảng data
        for (let i = 0; i < data.length; i++) {
            if (!isNaN(data[i].id) && data[i].id === parseInt(id)) {
                setProduct(data[i]);
                return true;
            }
        }
        // Nếu không tìm thấy id nào khớp, hiển thị thông báo và trả về false
        addNotify("Mã sản phẩm không tồn tại trong hệ thống", { type: 'error', timeout: 1000 });
        return false;
    }


    const checkPrductContainsVariation = (product: any, variation: any) => {
        console.log(product);
        console.log(variation);
        for (let i = 0; i < product.variations.length; i++) {
            if (product.variations[i].id === parseInt(variation)) {
                setVariation(product.variations[i]);
                return ;
            }
        }
        return addNotify("Mã biến thể không tồn tại trong hệ thống", { type: 'error', timeout: 1000 });
    }

    const checkVariationContainsSize = (variation: any, size: any) => {
        for (let i = 0; i < variation.sizes.length; i++) {
            if (variation.sizes[i].id === parseInt(size)) {
                return ;
            }
        }
        return addNotify("Mã kích cỡ không tồn tại trong hệ thống", { type: 'error', timeout: 1000 });
    }


    return (
        <Create>
            <SimpleForm warnWhenUnsavedChanges>
                <ArrayInput source="ImportInvoiceDetails" label="Sản phẩm">
                    <SimpleFormIterator inline>
                        <NumberInput source="product" label="Mã sản phẩm" validate={required()} onChange={(e) => {
                            checkDataContains(data, e.target.value);
                        }}/>
                        <NumberInput source="variation" label="Mã biến thể" validate={required()} onChange={(e) => {
                            setVariation(e.target.value);
                            checkPrductContainsVariation(product, e.target.value);
                        } }
                        />
                        <NumberInput source="size" label="Mã kích cỡ" validate={required()} onChange={(e) => {
                            setSize(e.target.value);
                            checkVariationContainsSize(variation, e.target.value);
                        }
                        }/>
                        <NumberInput source="quantity" label="Số lượng" validate={required()}/>
                        <NumberInput source="importPrice" label="Giá nhập" validate={required()}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    )
};

export default ImportInvoiceCreate;