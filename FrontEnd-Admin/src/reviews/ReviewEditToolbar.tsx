import * as React from 'react';
import {Fragment} from 'react';
import Toolbar from '@mui/material/Toolbar';

import {
    SaveButton,
    DeleteButton,
    ToolbarProps,
    useRecordContext,
    useNotify,
    useRedirect,
} from 'react-admin';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import {Review} from '../types';
import {checkPermission} from "../helpers";

const ReviewEditToolbar = (props: any) => {
    const {resource} = props;
    const redirect = useRedirect();
    const notify = useNotify();

    const record = useRecordContext<Review>(props);

    if (!record) return null;
    return (
        <Toolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: {sm: 0},
            }}
        >
            {record.type === 1 ? (
                props.permissions && checkPermission(props.permissions, "REVIEW_UPDATE") && <Fragment>
                    <AcceptButton/>
                    <RejectButton/>
                </Fragment>
            ) : (
                props.permissions && checkPermission(props.permissions, "REVIEW_DELETE") && <Fragment>
                    <DeleteButton mutationMode={'pessimistic'} record={record} resource={resource}
                                  label={'Xoá đánh giá'}/>
                </Fragment>
            )}
        </Toolbar>
    );
};

export default ReviewEditToolbar;
