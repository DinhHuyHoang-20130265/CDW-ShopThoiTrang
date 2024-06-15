import * as React from 'react';
import {FieldProps, useRecordContext} from 'react-admin';

import FullNameField from './FullNameField';
import {Customer} from '../types';

const UserLinkField = (_: FieldProps<Customer>) => {
    const record = useRecordContext<Customer>();
    if (!record) {
        return null;
    }
    return (
        <FullNameField sx={{paddingLeft: 1}}/>
    );
};

export default UserLinkField;
