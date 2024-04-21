import * as React from 'react';
import ThumbUp from '@mui/icons-material/ThumbUp';

import {
    Button,
    useUpdateMany,
    useNotify,
    useUnselectAll,
    Identifier,
    useListContext,
} from 'react-admin';

const noSelection: Identifier[] = [];

const BulkAcceptButton = () => {
    const {selectedIds = noSelection} = useListContext();
    const notify = useNotify();
    const unselectAll = useUnselectAll('review');

    const [updateMany, {isLoading}] = useUpdateMany(
        'review',
        {ids: selectedIds, data: {type: 2}},
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('resources.review.notification.approved_success', {
                    type: 'info',
                    undoable: true,
                });
                unselectAll();
            },
            onError: () => {
                notify('resources.review.notification.approved_error', {
                    type: 'error',
                });
            },
        }
    );

    return (
        <Button
            label="Chấp thuận"
            onClick={() => updateMany()}
            disabled={isLoading}
        >
            <ThumbUp/>
        </Button>
    );
};

export default BulkAcceptButton;
