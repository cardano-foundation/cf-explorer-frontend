import React from 'react';
import { CardHeader, TextLabel, TextValue } from './styles';
import StakeKeyBox from './StakeKeyBox';
import { Box, Grid, useTheme } from '@mui/material';
import CopyButton from '../../../commons/CopyButton';
import { getShortHash, getShortWallet } from '../../../../commons/utils/helper';
import { details } from '../../../../commons/routers';
import CustomTooltip from '../../../commons/CustomTooltip';
import { Link } from 'react-router-dom';

interface IProps {
  data: Transaction['poolCertificates'] | null;
}

const PoolCertificate: React.FC<IProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      {data
        ?.filter((d) => d.type === 'POOL_REGISTRATION')
        ?.map((item, index) => {
          return (
            <Box px='15px' key={index} mb='15px' bgcolor={theme.palette.background.paper} textAlign='left'>
              <CardHeader>Pool Registrations</CardHeader>
              <StakeKeyBox key={index} data={item} />
            </Box>
          );
        })}
      {data
        ?.filter((d) => d.type === 'POOL_DEREGISTRATION')
        ?.map((item, index) => {
          return (
            <Box px='15px' key={index} mb='15px' bgcolor={theme.palette.background.paper} textAlign='left'>
              <CardHeader>Pool Deregistrations</CardHeader>
              <Box py={2}>
                <Grid item xs={12} md={6}>
                  <Box display='flex' flexDirection='column' gap='15px'>
                    <Box display='flex' alignItems='center'>
                      <TextLabel>Pool Id: </TextLabel>
                      <TextValue>
                        <CustomTooltip title={item.poolId}>
                          <Box color={'#108aef !important'} component={Link} to={details.delegation(item.poolId)}>
                            {getShortHash(item.poolId)}
                          </Box>
                        </CustomTooltip>
                        <CopyButton text={item.poolId} />
                      </TextValue>
                    </Box>
                    <Box display='flex' alignItems='center'>
                      <TextLabel>Epoch: </TextLabel>
                      <TextValue>{item.epoch}</TextValue>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default PoolCertificate;
