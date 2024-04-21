import * as React from 'react';
import {ReferenceField, ReferenceFieldProps} from 'react-admin';

import FullNameField from './FullNameField';

const UserReferenceField = (
    props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
        source?: string;
    }
) => (
    <ReferenceField source="reviewer.id" reference="user" {...props}>
        <FullNameField/>
    </ReferenceField>
);

UserReferenceField.defaultProps = {
    source: 'reviewer',
};

export default UserReferenceField;
