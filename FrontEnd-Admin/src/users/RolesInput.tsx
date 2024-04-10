import * as React from 'react';
import {SelectArrayInput, SelectArrayInputProps} from 'react-admin';

const RolesInput = (props: SelectArrayInputProps) => (
    <SelectArrayInput
        {...props}
        source="authorities"
        optionValue={"authority"}
        choices={[]}
    />
);

export default RolesInput;
