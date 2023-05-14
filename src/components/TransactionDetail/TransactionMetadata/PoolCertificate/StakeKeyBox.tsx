import { Box, Grid } from '@mui/material';
import CopyButton from '../../../commons/CopyButton';
import { TextLabel, TextNormal, TextRightValue, TextValue } from './styles';
import { LinkIcon } from '../../../../commons/resources';
import Link from '../../../commons/Link';
import { getShortHash, getShortWallet } from '../../../../commons/utils/helper';
import { AdaValue } from '../../../TabularView/StakeTab/Tabs/StakeRegistrationTab';

type TProps = {
  data: TPoolCertificated;
};

const StakeKeyBox = ({ data }: TProps) => {
  const leftRow = [
    {
      label: 'Pool ID',
      value: getShortHash(data.poolId)
    },
    {
      label: 'VRF Key',
      value: getShortHash(data?.vrfKey)
    },
    {
      label: 'Reward Account',
      value: getShortWallet(data.rewardAccount)
    },
    {
      label: 'Pool Operator',
      value: getShortWallet(data.poolOwners[0])
    },
    {
      label: 'Metadata Hash',
      value: getShortHash(data.metadataHash)
    }
  ];

  const rightRow = [
    {
      label: 'Margin',
      value: `${data.margin}%`
    },
    {
      label: 'Cost',
      value: <AdaValue value={data.cost} />
    },
    {
      label: 'Pledge',
      value: <AdaValue value={data.pledge} />
    },
    {
      label: 'Relay nNode',
      value: (
        <TextNormal>
          IPv4: <TextRightValue>{data.relays.ipv4}</TextRightValue> | Port:
          <TextRightValue>{data.relays.port}</TextRightValue>
        </TextNormal>
      )
    },
    {
      label: 'Metadata URL',
      value: (
        <Box display='flex'>
          <TextValue>{getShortHash(data?.metadataHash)}</TextValue>&nbsp;
          <Link to={data?.metadataUrl}>
            <LinkIcon />
          </Link>
        </Box>
      )
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
        <Grid item xs={12} md={6}>
          {rightRow.map(({ label, value }) => {
            return (
              <Box key={label} sx={{ marginBottom: '15px' }}>
                <TextLabel>{label}: </TextLabel>
                <TextRightValue>{value}</TextRightValue>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
export default StakeKeyBox;
