import * as React from 'react';
import {useCallback} from 'react';
import {
    CreateButton,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TopToolbar,
} from 'react-admin';
import {matchPath, useLocation, useNavigate} from 'react-router-dom';
import {Box, Drawer, useMediaQuery, Theme} from '@mui/material';

import ReviewListMobile from './ReviewListMobile';
import ReviewListDesktop from './ReviewListDesktop';
import reviewFilters from './reviewFilters';
import ReviewEdit from './ReviewEdit';

const ReviewListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <SelectColumnsButton/>
        <ExportButton/>
    </TopToolbar>
);

const ReviewList = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        navigate('/review');
    }, [navigate]);

    const match = matchPath('/review/:id', location.pathname);

    return (
        <Box display="flex">
            <List
                sx={{
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
                filters={reviewFilters}
                perPage={25}
                sort={{field: 'reviewedDate', order: 'DESC'}}
                actions={<ReviewListActions/>}
            >
                {isXSmall ? (
                    <ReviewListMobile/>
                ) : (
                    <ReviewListDesktop
                        selectedRow={
                            !!match
                                ? parseInt((match as any).params.id, 10)
                                : undefined
                        }
                    />
                )}
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{zIndex: 100}}
            >
                {!!match && (
                    <ReviewEdit
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
        </Box>
    );
};

export default ReviewList;
