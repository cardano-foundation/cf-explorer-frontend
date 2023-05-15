import { Box, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import receiveImg from '../../../../commons/resources/images/receiveImg.svg';
import sendImg from '../../../../commons/resources/images/sendImg.svg';
import { details } from '../../../../commons/routers';
import { formatADAFull, getShortWallet } from '../../../../commons/utils/helper';
import ADAicon from '../../../commons/ADAIcon';
import CopyButton from '../../../commons/CopyButton';
import CustomTooltip from '../../../commons/CustomTooltip';
import DropdownTokens from '../../../commons/DropdownTokens';
import { Icon } from './styles';
import { useScreen } from '../../../../commons/hooks/useScreen';

const SummaryItems = ({
  item,
  type
}: {
  item: Transaction['summary']['stakeAddress'][number];
  type?: 'up' | 'down';
}) => {
  const theme = useTheme();
  const { isMobile, isGalaxyFoldSmall } = useScreen();
  return (
    <Box
      display={'flex'}
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent={'space-between'}
      sx={{
        background: (theme) => theme.palette.background.paper,
        px: 3,
        py: 2,
        mb: 1,
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          px: 2
        }
      }}
    >
      <Box display={'flex'}>
        <Box width={50}>
          <Icon src={type === 'down' ? receiveImg : sendImg} alt='send icon' />
        </Box>
        <Box flex={1} pt='4px'>
          <Box display={'flex'} alignItems='center' justifyContent={'flex-start'}>
            <Box width={'100%'} display='flex' alignItems={'center'} justifyContent='center' flexWrap={'wrap'}>
              <Box display={'flex'} justifyContent='flex-start' alignItems={'center'} pr={1} mb={1}>
                {type === 'down' ? 'From' : 'To'}:{' '}
              </Box>
              <Box display={'flex'} justifyContent='flex-start' alignItems={'center'} flex={1} mb={1}>
                <Box display={'flex'} justifyContent='flex-start' alignItems={'center'} flexWrap={'nowrap'}>
                  <Link
                    to={item.address.startsWith('stake') ? details.stake(item.address) : details.address(item.address)}
                  >
                    <CustomTooltip title={item.address}>
                      <Box
                        color={(theme) => theme.palette.blue[800]}
                        fontWeight='bold'
                        fontFamily={'var(--font-family-text)'}
                      >
                        {getShortWallet(item.address)}
                      </Box>
                    </CustomTooltip>
                  </Link>
                  <CopyButton text={item.address} style={{ cursor: 'pointer', verticalAlign: 'text-bottom' }} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent={'space-between'}
            width='100%'
            mb={1}
          >
            <Box
              display='flex'
              justifyContent={'space-between'}
              alignItems={isGalaxyFoldSmall ? 'flex-start' : 'center'}
              pr={1}
              flexDirection={isGalaxyFoldSmall ? 'column' : 'row'}
            >
              <Box pr={1}>{type === 'down' ? 'ADA sent:' : 'ADA received:'} </Box>
              <Box flex={1} display='flex' justifyContent={'space-between'} alignItems='center'>
                <Box
                  component={'span'}
                  whiteSpace='nowrap'
                  color={(theme) => (type === 'up' ? theme.palette.success.main : theme.palette.error.main)}
                  fontWeight='bold'
                  mr={1}
                >
                  {type === 'down' ? `-${formatADAFull(item.value)}` : `+${formatADAFull(item.value)}`}
                </Box>
                <ADAicon />
              </Box>
            </Box>
          </Box>
          {/* {type === "up" ? (
            <Box
              display={"flex"}
              alignItems={isGalaxyFoldSmall ? "flex-start" : "center"}
              flexDirection={isGalaxyFoldSmall ? "column" : "row"}
              justifyContent={"space-between"}
              width="100%"
              mb={1}
            >
              <Box display="flex" justifyContent={"space-between"} alignItems="center" pr={1}>
                Fee paid:
              </Box>
              <Box flex={1} display="flex" alignItems="center">
                <Box
                  component={"span"}
                  whiteSpace="nowrap"
                  color={theme => theme.palette.error.main}
                  fontWeight="bold"
                  mr={1}
                >
                  -{formatADAFull(item.fee) || 0}
                </Box>
                <ADAicon />
              </Box>
            </Box>
          ) : null} */}
        </Box>
      </Box>
      {item.tokens && item.tokens.length > 0 && (
        <Box display={'flex'} alignItems={'center'} ml={isMobile ? '50px' : 0}>
          <DropdownTokens tokens={item.tokens} type={type} />
        </Box>
      )}
    </Box>
  );
};

interface SummaryProps {
  data: Transaction['summary'] | null;
}
const Summary: React.FC<SummaryProps> = ({ data }) => {
  return (
    <Box>
      {data?.stakeAddress?.map((tx, key) => {
        const type = tx.value >= 0 ? 'up' : 'down';
        return <SummaryItems key={key} item={tx} type={type} />;
      })}
    </Box>
  );
};

export default Summary;
