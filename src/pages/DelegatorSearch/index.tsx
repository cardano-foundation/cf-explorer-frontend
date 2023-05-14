import { Box, styled } from '@mui/material';
import { SearchDelegatorIcon } from '../../commons/resources';
import { Link } from 'react-router-dom';
import { routers } from '../../commons/routers';

const DelegatorSearch = () => {
  return (
    <Box>
      <h2>Welcome to Staking Lifecycle (SPO)</h2>
      <Box>
        <SearchDelegatorIcon />
      </Box>
      <Box mb={3}>No active Stake key found</Box>
      <LoginBtn to={routers.SIGN_IN}>Login to view personal staking lifecylcle</LoginBtn>
    </Box>
  );
};

export default DelegatorSearch;

const LoginBtn = styled(Link)(() => ({
  fontSize: '1.875rem',
  textDecoration: 'underline !important',
  cursor: 'pointer'
}));
