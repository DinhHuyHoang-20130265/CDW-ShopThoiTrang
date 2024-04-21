import {Box, Rating, Typography, styled} from '@mui/material';
import Icon from '@mui/icons-material/Stars';
import {InputProps, useInput} from 'react-admin';

const StarRatingInput = (props: InputProps) => {
    const {field} = useInput(props);

    return (
        <Box display="flex" flexDirection="column" marginBottom="1rem">
            <Typography>Đánh giá</Typography>
            <StyledRating
                {...field}
                icon={<Icon/>}
                onChange={(event, value) => field.onChange(value)}
            />
        </Box>
    );
};

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
    '& .MuiRating-iconHover': {
        color: '#000',
    },
});

export default StarRatingInput;
