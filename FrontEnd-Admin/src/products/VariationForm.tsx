import React from 'react';
import {ArrayInput, SimpleFormIterator, TextInput, NumberInput, BooleanInput} from 'react-admin';

const VariationForm = ({record}: any) => {
    const renderSizeInputs = (variation: any) => (
        <ArrayInput source={`variations.${variation.id}.sizes`} label={`Sizes for Variation ${variation.id}`}>
            <SimpleFormIterator>
                <TextInput source="size" label="Size"/>
                <NumberInput source="stock" label="Stock"/>
                <BooleanInput source="status" label="Status"/>
                {/* Thêm các trường khác nếu cần */}
            </SimpleFormIterator>
        </ArrayInput>
    );

    return (
        <div>
            {record.map((variation: any) => (
                <div key={variation.id}>
                    <h3>Variation {variation.id}</h3>
                    {renderSizeInputs(variation)}
                </div>
            ))}
        </div>
    );
};

export default VariationForm;
