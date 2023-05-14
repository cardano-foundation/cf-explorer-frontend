import { Box, Grid } from '@mui/material';
import CopyButton from '../../../commons/CopyButton';
import { TextLabel, TextValue } from './styles';
import { getShortWallet } from '../../../../commons/utils/helper';

type TProps = {
  data: TStakeCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const leftRow = [
    {
      label: 'Address Stake Key',
      value: getShortWallet(data.stakeAddress)
    }
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {leftRow.map(({ label, value }) => {
            return (
              <Box key={label} sx={{ marginBottom: '15px' }}>
                <TextLabel>{label}: </TextLabel>
                <TextValue>
                  {value} <CopyButton text={value} />
                </TextValue>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
