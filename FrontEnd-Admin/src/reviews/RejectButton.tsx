import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ThumbDown from '@mui/icons-material/ThumbDown';
import {
    useUpdate,
    useNotify,
    useRedirect,
    useRecordContext,
} from 'react-admin';
import {Review} from '../types';

const RejectButton = () => {
    const notify = useNotify();
    const redirectTo = useRedirect();
    const record = useRecordContext<Review>();

    const [reject, {isLoading}] = useUpdate(
        'review',
        {id: record.id, data: {type: 0}, previousData: record},
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('Từ chối thành công', {
                    type: 'success',
                    undoable: true,
                });
                redirectTo('/review');
            },
            onError: () => {
                notify('Từ chối thất bại', {
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
            onClick={() => reject()}
            sx={{borderColor: theme => theme.palette.error.main}}
            startIcon={
                <ThumbDown sx={{color: theme => theme.palette.error.main}}/>
            }
            disabled={isLoading}
        >
            Từ Chối
        </Button>
    ) : (
        <span/>
    );
};

RejectButton.propTypes = {
    record: PropTypes.any,
};

export default RejectButton;
