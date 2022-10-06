import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {styled} from '@mui/material/styles';

export type BasicRatingProps = {
    values: number
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#0ddc66',
    },
    '& .MuiRating-iconHover': {
        color: 'rgba(127,244,203,0.55)',
    },
})


export const BasicRating = (props: BasicRatingProps) => {
    const [value, setValue] = React.useState<number | null>(2);
    return (
        <Box
            sx={{
                '& > legend': {mt: 2},
            }}
        >
            <StyledRating
                name="customized-color"
                defaultValue={props.values}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit"/>}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
            />
        </Box>
    );
}