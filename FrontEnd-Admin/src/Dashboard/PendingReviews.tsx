import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import {Link} from 'react-router-dom';

import {
    ReferenceField,
    FunctionField,
    useGetList,
    useTranslate,
    useIsDataLoaded,
} from 'react-admin';

import {stringify} from 'query-string';

import CardWithIcon from './CardWithIcon';
import StarRatingField from '../reviews/StarRatingField';
import {Customer, Review} from '../types';
import {useMemo} from "react";

const PendingReviews = (reviews: any) => {
    // get reviews that have status pending
    const pendingReviews = useMemo(() => {
        if (!Array.isArray(reviews.reviews)) return [];
        return reviews.reviews.filter((review: any) => review.type === 1);
    }, [reviews]);

    return (
        <CardWithIcon
            to={{
                pathname: '/review',
                search: stringify({
                    filter: JSON.stringify({status: 'pending'}),
                }),
            }}
            icon={ReviewsRoundedIcon}
            title={"Đánh giá chờ xử lý"}
            subtitle={pendingReviews.length}
        >
            <List>
                { pendingReviews.map((record: Review) => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/review/${record.id}`}
                        alignItems="flex-start"
                        onScroll={(e) => e.stopPropagation()}
                    >
                        <ListItemAvatar>
                            <ReferenceField
                                record={record}
                                source="reviewer"
                                reference="user"
                                link={false}
                            >
                                <FunctionField<Customer>
                                    render={customer => (
                                        <Avatar
                                            src={`${customer?.userInfo?.avtUrl}?size=32x32`}
                                            sx={{
                                                bgcolor: 'background.paper',
                                            }}
                                            alt={`${customer.userInfo.fullName}`}
                                        />
                                    )}
                                />
                            </ReferenceField>
                        </ListItemAvatar>

                        <ListItemText
                            primary={<StarRatingField record={record}/>}
                            secondary={record.content}
                            sx={{
                                overflowY: 'hidden',
                                height: '4em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                paddingRight: 0,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box flexGrow={1}>&nbsp;</Box>
            <Button
                sx={{borderRadius: 0}}
                component={Link}
                to="/review"
                size="small"
                color="primary"
            >
                <Box p={1} sx={{color: 'primary.main'}}>
                    Xem tất cả
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default PendingReviews;
