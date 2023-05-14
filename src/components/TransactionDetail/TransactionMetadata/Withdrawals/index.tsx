import React from 'react';
import { Box } from '@mui/material';
import sendImg from '../../../../commons/resources/images/sendImg.svg';
import { formatADAFull, getShortWallet } from '../../../../commons/utils/helper';
import CopyButton from '../../../commons/CopyButton';
import { details } from '../../../../commons/routers';
import CustomTooltip from '../../../commons/CustomTooltip';
import { AddressLink, Amount, ItemContainer, StatusIcon, StyledItem, Wrapper, Header } from './styles';

import ADAicon from '../../../commons/ADAIcon';

interface WithdrawalsProps {
  data: Transaction['withdrawals'] | null;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Box>Wallet Addresses</Box>
        <Box>Amount</Box>
      </Header>
      {data?.map((item) => (
        <StyledItem key={item.stakeAddressFrom}>
          <ItemContainer>
            <Box width={50}>
              <StatusIcon src={sendImg} alt='wallet icon' />
            </Box>
            <Box flex={1}>
              <Box>
                <span>From: </span>
                <CustomTooltip title={item.stakeAddressFrom}>
                  <AddressLink to={details.address(item.stakeAddressFrom)}>
                    {getShortWallet(item.stakeAddressFrom || '')}
                  </AddressLink>
                </CustomTooltip>
                <CopyButton text={item.stakeAddressFrom || ''} />
              </Box>
              <Box display={'flex'}>
                <Box minWidth='1.75rem'>To:</Box>
                <Box flex={1}>
                  {item?.addressTo.map((address, idx) => {
                    return (
                      <Box key={idx}>
                        <CustomTooltip title={address}>
                          <AddressLink to={details.address(address)}>{getShortWallet(address || '')}</AddressLink>
                        </CustomTooltip>
                        <CopyButton text={address || ''} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box minWidth='max-content'>
              <Amount>+ {formatADAFull(item?.amount)}</Amount>
              <ADAicon ml={'3px'} />
            </Box>
          </ItemContainer>
        </StyledItem>
      ))}
    </Wrapper>
  );
};

export default Withdrawals;
