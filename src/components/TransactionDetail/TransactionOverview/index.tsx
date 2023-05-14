import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailHeader from '../../commons/DetailHeader';
import { formatADAFull, formatDateTimeLocal, getShortWallet } from '../../../commons/utils/helper';
import { CONFIRMATION_STATUS, MAX_SLOT_EPOCH } from '../../../commons/utils/constants';
import { Box, IconButton, useTheme } from '@mui/material';
import { ConfirmStatus, MaxSlot, StyledLink, TitleCard } from './styles';
import timeIcon from '../../../commons/resources/icons/time.svg';
import exchageAltIcon from '../../../commons/resources/icons/exchangeArrow.svg';
import txConfirm from '../../../commons/resources/icons/txConfirm.svg';
import totalOutput from '../../../commons/resources/icons/totalOutput.svg';
import cubeIcon from '../../../commons/resources/icons/blockIcon.svg';
import slotIcon from '../../../commons/resources/icons/slot.svg';
import txInputIcon from '../../../commons/resources/icons/txInput.svg';
import txOutputIcon from '../../../commons/resources/icons/txOutput.svg';
import CopyButton from '../../commons/CopyButton';
import { details } from '../../../commons/routers';
import DropdownDetail from '../../commons/DropdownDetail';
import { BiShowAlt } from 'react-icons/bi';
import { RootState } from '../../../stores/types';
import CustomTooltip from '../../commons/CustomTooltip';
import ADAicon from '../../commons/ADAIcon';

interface Props {
  data: Transaction | null;
  loading: boolean;
}

const TransactionOverview: React.FC<Props> = ({ data, loading }) => {
  const { currentEpoch } = useSelector(({ system }: RootState) => system);
  const [openListInput, setOpenListInput] = useState(false);
  const [openListOutput, setOpenListOutput] = useState(false);
  const theme = useTheme();

  const renderConfirmationTag = () => {
    if (data && data.tx && data.tx.confirmation) {
      if (data.tx.confirmation <= 2) {
        return CONFIRMATION_STATUS.LOW;
      }
      if (data.tx.confirmation <= 8) {
        return CONFIRMATION_STATUS.MEDIUM;
      }
      return CONFIRMATION_STATUS.HIGH;
    }
  };

  const inputTransaction = useMemo(() => {
    const result = [];
    if (data?.utxOs && data?.utxOs?.inputs?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const item of data?.utxOs?.inputs) {
        if (item.tokens.length) {
          result.push(...item.tokens);
        }
      }
    }
    return result;
  }, [data?.utxOs]);

  const outputTransaction = useMemo(() => {
    const result = [];
    if (data?.utxOs && data?.utxOs?.outputs?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const item of data?.utxOs?.outputs) {
        if (item.tokens.length) {
          result.push(...item.tokens);
        }
      }
    }
    return result;
  }, [data?.utxOs]);

  const listOverview = [
    {
      icon: txInputIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1} height={24}>
            Input{' '}
            {data?.utxOs && data?.utxOs?.inputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(false);
                  setOpenListInput(!openListInput);
                }}
              >
                <BiShowAlt color={openListInput ? theme.palette.common.black : theme.palette.text.hint} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.inputs?.length > 0 && (
        <Box position={'relative'}>
          <CustomTooltip title={data?.utxOs?.inputs[0]?.address || ''}>
            <StyledLink to={details.address(data?.utxOs?.inputs[0]?.address || '')}>
              {getShortWallet(data?.utxOs?.inputs[0]?.address || '')}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.utxOs?.inputs[0]?.address || ''} />
          {openListInput && (
            <DropdownDetail
              minWidth={200}
              title='Address list'
              value={data?.utxOs?.inputs.map((i) => i.address) || []}
              close={() => setOpenListInput(false)}
            />
          )}
        </Box>
      ),
      allowSearch: true,
      isSent: true,
      dataSearch: inputTransaction
    },
    {
      icon: txOutputIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1} height={24}>
            Output{' '}
            {data?.utxOs && data?.utxOs?.outputs?.length > 1 && (
              <IconButton
                style={{ padding: 0 }}
                onClick={() => {
                  setOpenListOutput(!openListOutput);
                  setOpenListInput(false);
                }}
              >
                <BiShowAlt color={openListOutput ? theme.palette.common.black : theme.palette.text.hint} />
              </IconButton>
            )}
          </TitleCard>
        </Box>
      ),
      value: data?.utxOs && data?.utxOs?.outputs?.length > 0 && (
        <Box position={'relative'}>
          <CustomTooltip title={data?.utxOs?.outputs[0]?.address || ''}>
            <StyledLink to={details.address(data?.utxOs?.outputs[0]?.address || '')}>
              {getShortWallet(data?.utxOs?.outputs[0]?.address || '')}
            </StyledLink>
          </CustomTooltip>
          <CopyButton text={data?.utxOs?.outputs[0]?.address || ''} />
          {openListOutput && (
            <DropdownDetail
              minWidth={200}
              title='Address list'
              value={data?.utxOs?.outputs.map((i) => i.address) || []}
              close={() => setOpenListOutput(false)}
            />
          )}
        </Box>
      ),
      allowSearch: true,
      dataSearch: outputTransaction
    },
    {
      icon: timeIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>Time </TitleCard>
        </Box>
      ),
      value: formatDateTimeLocal(data?.tx?.time || '')
    },
    {
      icon: txConfirm,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>Confirmation</TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.tx?.confirmation || 0}
          <ConfirmStatus status={renderConfirmationTag() || 'LOW'}>{renderConfirmationTag() || 'LOW'}</ConfirmStatus>
        </>
      )
    },
    {
      icon: totalOutput,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>Total Output</TitleCard>
        </Box>
      ),
      value: (
        <Box component={'span'}>
          {formatADAFull(data?.tx?.totalOutput)} <ADAicon />
        </Box>
      )
    },
    {
      icon: exchageAltIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard mr={1}>Transaction Fees </TitleCard>
        </Box>
      ),
      value: (
        <Box component={'span'}>
          {formatADAFull(data?.tx?.fee)} <ADAicon />
        </Box>
      )
    },
    {
      icon: cubeIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard height={24} mr={1}>
            {' '}
            Block
          </TitleCard>
        </Box>
      ),
      value: <StyledLink to={details.block(data?.tx?.blockNo || 0)}>{data?.tx?.blockNo || 0}</StyledLink>
    },
    {
      icon: slotIcon,
      title: (
        <Box display={'flex'} alignItems='center'>
          <TitleCard height={24} mr={1}>
            Slot
          </TitleCard>
        </Box>
      ),
      value: (
        <>
          {data?.tx?.epochSlot || 0}/<MaxSlot>432000</MaxSlot>
        </>
      )
    }
  ];
  return (
    <DetailHeader
      type='TRANSACTION'
      bookmarkData={data?.tx.hash || ''}
      title={'Transaction detail'}
      hash={data?.tx.hash}
      transactionStatus={data?.tx.status}
      epoch={
        data && {
          no: data.tx.epochNo,
          slot: currentEpoch?.no === data.tx.epochNo ? data.tx.epochSlot : MAX_SLOT_EPOCH
        }
      }
      listItem={listOverview}
      loading={loading}
    />
  );
};

export default TransactionOverview;
