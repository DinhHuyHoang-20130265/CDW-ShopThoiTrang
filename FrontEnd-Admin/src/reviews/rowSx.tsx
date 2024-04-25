import green from '@mui/material/colors/green';
import type {SxProps} from '@mui/material';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';
import {Identifier} from 'react-admin';

import {Review} from '../types';

const rowSx = (selectedRow?: Identifier) => (record: Review): SxProps => {
    let style = {};
    if (!record) {
        return style;
    }
    if (selectedRow && selectedRow === record.id) {
        style = {
            ...style,
            backgroundColor: 'action.selected',
        };
    }
    if (record.type === 2)
        return {
            ...style,
            borderLeftColor: green[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.type === 1)
        return {
            ...style,
            borderLeftColor: orange[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    if (record.type === 0)
        return {
            ...style,
            borderLeftColor: red[500],
            borderLeftWidth: 5,
            borderLeftStyle: 'solid',
        };
    return style;
};

export default rowSx;
