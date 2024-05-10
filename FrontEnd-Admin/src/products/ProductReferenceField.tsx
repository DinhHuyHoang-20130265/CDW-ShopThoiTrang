import * as React from 'react';
import {ReferenceField, ReferenceFieldProps, TextField} from 'react-admin';

interface Props {
    source?: string;
}

const ProductReferenceField = (
    props: Props &
        Omit<ReferenceFieldProps, 'source' | 'reference' | 'children'>
) => (
    <ReferenceField
        source="id"
        reference="product"
        {...props}
    >
        <TextField source="name"/>
    </ReferenceField>
);

export default ProductReferenceField;
