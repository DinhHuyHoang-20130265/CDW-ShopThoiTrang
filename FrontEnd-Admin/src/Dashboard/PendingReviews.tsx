import * as React from 'react';
import {
    Avatar,
    Box,
    Button, Card, CardHeader,
    ListItem,
    ListItemAvatar,
    ListItemText, Rating,
} from '@mui/material';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import {Link} from 'react-router-dom';

import {
    ReferenceField,
    FunctionField,
} from 'react-admin';


import StarRatingField from '../reviews/StarRatingField';
import {Customer, Review} from '../types';
import {useMemo} from "react";
import {FixedSizeList} from "react-window";

const PendingReviews = (reviews: any) => {
    // get reviews that have status pending
    const pendingReviews = useMemo(() => {
        if (!Array.isArray(reviews.reviews)) return [];
        return reviews.reviews.filter((review: any) => review.type === 1);
    }, [reviews]);

    return (
        <Card sx={{flex: 1}}>
            <CardHeader title={"Đánh giá chờ duyệt"}/>
            <FixedSizeList
                height={400}
                itemCount={pendingReviews.length}
                itemSize={80}
                width="100%"
                style={{listStyle: 'none', padding: 0}}
            >
                {({index, style}) => {
                    const review = pendingReviews[index];
                    return (
                        <div style={style}>
                            <ListItem key={review.id} button component={Link} to={`/review/${review.id}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ReviewsRoundedIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={review.content.length > 70 ? `${review.content.substr(0, 70)}...` : review.content}
                                    secondary={
                                        <Box display="flex">
                                            <Rating
                                                value={review.rating}
                                                readOnly
                                                sx={{mr: 1}}
                                            />
                                        </Box>
                                    }
                                />
                            </ListItem>
                        </div>
                    );
                }}
            </FixedSizeList>
        </Card>
    );
};

export default PendingReviews;
