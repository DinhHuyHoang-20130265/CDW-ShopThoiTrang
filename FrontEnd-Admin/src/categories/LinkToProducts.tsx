import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTranslate, useRecordContext } from 'react-admin';
import queryString from 'query-string';

import { Category } from '../types';

const LinkToProducts = () => {
    const record = useRecordContext<Category>();
    const translate = useTranslate();
    if (!record) return null;
    return (
        <Button
            variant="outlined"
            size="small"
            color="primary"
            component={Link}
            to={{
                pathname: '/product',
                search: queryString.stringify({
                    filter: JSON.stringify({ categoryId: record.id }),
                }),
            }}
            sx={{ display: 'inline-flex', alignItems: 'center' }}>Sản phẩm</Button>
    );
};

export default LinkToProducts;
