import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
    useUpdate,
    useNotify,
    useRedirect,
    useRecordContext,
} from 'react-admin';
import {Review} from '../types';

const AcceptButton = () => {
    const notify = useNotify();
    const redirectTo = useRedirect();
    const record = useRecordContext<Review>();

    const [approve, {isLoading}] = useUpdate(
        'review',
        {id: record.id, data: {type: 2}, previousData: record},
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('Chấp thuận thành công', {
                    type: 'success',
                    undoable: true,
                });
                redirectTo('/review');
            },
            onError: () => {
                notify('Chấp thuận thất bại', {
                    type: 'error',
                });
            },
        }
    );
    return record && record.type === 1 ? (
        <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => approve()}
            sx={{borderColor: theme => theme.palette.success.main}}
            startIcon={
                <ThumbUp sx={{color: theme => theme.palette.success.main}}/>
            }
            disabled={isLoading}
        >
            Chấp thuận
        </Button>
    ) : (
        <span/>
    );
};

AcceptButton.propTypes = {
    record: PropTypes.any,
};

export default AcceptButton;
