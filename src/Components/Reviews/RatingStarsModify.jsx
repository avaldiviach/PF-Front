import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#fb501499', 
  },
  '& .MuiRating-iconHover': {
    color: '#fb5014', 
  },
});

//Componente de las estrellas
export default function BasicRating({setRating}) {
  const [value, setValue] = React.useState();

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        name="simple-controlled"
        size="large"
        value={value}
        precision={0.5}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        icon={<FavoriteIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue)
        }}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
}



{/* <Typography component="legend">Read only</Typography>
<Rating name="read-only" value={value} readOnly />
<Typography component="legend">Disabled</Typography>
<Rating name="disabled" value={value} disabled />
<Typography component="legend">No rating given</Typography>
<Rating name="no-value" value={null} /> */}