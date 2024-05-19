import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTranslate, useRecordContext } from 'react-admin';
import queryString from 'query-string';

import {Category, Customer} from '../types';

const LinkToUser = () => {
    const record = useRecordContext();
    console.log(record?.user?.id);
    if (!record) return null;
    return (
        <Button
            // variant="outlined"
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: `/user/${record?.user?.id}`,

            }}
            sx={{ display: 'inline-flex', alignItems: 'center' }}>{record?.user?.username}</Button>
    );
};

export default LinkToUser;
