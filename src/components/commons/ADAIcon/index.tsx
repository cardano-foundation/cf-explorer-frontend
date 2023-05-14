import { Box } from '@mui/material';

const ADAicon = ({ ...props }) => {
  return (
    <Box component={'span'} fontSize={'14px'} {...props} lineHeight={1} fontWeight={'regular'}>
      ₳
    </Box>
  );
};

export default ADAicon;
