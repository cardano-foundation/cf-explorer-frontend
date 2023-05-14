import { Box } from '@mui/material';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { details } from '../../../commons/routers';
import { getShortHash, getShortWallet, numberWithCommas } from '../../../commons/utils/helper';
import { CustomSelect, OptionSelect } from './styles';
import { useScreen } from '../../../commons/hooks/useScreen';

interface IDropdownTokens {
  tokens: Token[];
  type?: 'up' | 'down' | undefined;
}

const DropdownTokens: React.FC<IDropdownTokens> = ({ tokens, type = 'down' }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const history = useHistory();
  const handleClickItem = (link: string) => {
    history.push(link);
  };
  const { isMobile } = useScreen();
  return (
    <CustomSelect
      sx={{
        minWidth: isMobile ? '100%' : '250px'
      }}
      onOpen={() => setOpenDropdown(true)}
      onClose={() => setOpenDropdown(false)}
      value={'default'}
      IconComponent={() =>
        openDropdown ? (
          <BiChevronUp size={30} style={{ paddingRight: 10, fontSize: '20px' }} />
        ) : (
          <BiChevronDown size={30} style={{ paddingRight: 10, fontSize: '20px' }} />
        )
      }
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: 2,
            marginTop: 0.5
          }
        }
      }}
    >
      <OptionSelect sx={{ display: 'none' }} value='default'>
        {' '}
        {type === 'down' ? 'Sent' : 'Received'} Token
      </OptionSelect>
      {tokens.map((token, idx) => (
        <OptionSelect key={idx} onClick={() => handleClickItem(details.token(token.assetId))}>
          <Box>
            {(token.assetName && token.assetName.length > 20 ? getShortHash(token.assetName) : token.assetName) ||
              getShortWallet(token.assetId)}
          </Box>
          <Box fontWeight={'bold'} fontSize={'14px'}>
            {`${numberWithCommas(token.assetQuantity) || ''}`}
          </Box>
        </OptionSelect>
      ))}
    </CustomSelect>
  );
};

export default DropdownTokens;
