import { alpha, Box, Grid, Skeleton, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link as LinkDom } from 'react-router-dom';

import {
  SPOStalking,
  ButtonListIcon,
  BackIcon,
  AddressIcon,
  ADAGreen,
  TimeIcon,
  SPOInfo,
  SPOKey
} from '../../../../commons/resources';
import cadarnoSystem from '../../../../commons/resources/icons/Staking/cadarnoSystemIcon.svg';
import RegistrationCertificate from '../../../../commons/resources/icons/Staking/PoolRegistrationCertificateIcon.svg';

import Line from '../../../Line';
import {
  ButtonSPO,
  FeeBox,
  HoldBox,
  IconButton,
  IconButtonBack,
  Info,
  InfoText,
  PoolName,
  PoolNamePopup
} from './styles';
import ADAicon from '../../../commons/ADAIcon';
import ArrowDiagram from '../../../ArrowDiagram';
import PopoverStyled from '../../../commons/PopoverStyled';
import CustomTooltip from '../../../commons/CustomTooltip';
import RecentRegistrations from './RecentRegistrations';
import useFetch from '../../../../commons/hooks/useFetch';
import { API } from '../../../../commons/utils/api';
import { useParams } from 'react-router';
import { formatADA, getShortHash, getShortWallet } from '../../../../commons/utils/helper';
import moment from 'moment';
import PopupStaking from '../../../commons/PopupStaking';
import CopyButton from '../../../commons/CopyButton';
import { details } from '../../../../commons/routers';
import StyledModal from '../../../commons/StyledModal';

const Registration = ({
  containerPosition,
  handleResize
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
}) => {
  const [selected, setSelected] = useState<SPORegistration | null>(null);
  return (
    <Box>
      <Box>{selected === null && <RecentRegistrations onSelect={(registration) => setSelected(registration)} />}</Box>
      <Box>
        {!!selected && (
          <RegistrationTimeline
            handleResize={handleResize}
            setSelected={setSelected}
            selected={selected}
            containerPosition={containerPosition}
          />
        )}
      </Box>
    </Box>
  );
};
export default Registration;

const RegistrationTimeline = ({
  containerPosition,
  setSelected,
  handleResize,
  selected
}: {
  containerPosition: {
    top?: number;
    left?: number;
  };
  handleResize: () => void;
  setSelected: (registration: SPORegistration | null) => void;
  selected: SPORegistration | null;
}) => {
  const { poolId = '' } = useParams<{ poolId: string }>();
  const { data, loading } = useFetch<SPORegistrationDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.SPO_REGISTRATION_DETAIl(poolId, selected?.poolUpdateId) : ''
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleResize();
  }, [loading]);

  const adaHolderRef = useRef(null);
  const holdRef = useRef(null);
  const feeRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const fake1Ref = useRef(null);
  const fake2Ref = useRef(null);
  const registrationRef = useRef(null);
  const SPOInfoRef = useRef(null);
  const SPOKeyRef = useRef(null);

  if (loading) {
    return (
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={2}>
          <IconButtonBack onClick={() => setSelected(null)}>
            <BackIcon />
          </IconButtonBack>
          <Box display={'flex'}>
            <Info>
              <AddressIcon fill='#438F68' />
              <Box component={Skeleton} ml={1} variant='rectangular' width={145} height={18} />
            </Info>
            <Info>
              <ADAGreen />
              <Box component={Skeleton} ml={1} variant='rectangular' width={60} height={18} />
            </Info>
            <Info>
              <TimeIcon />
              <Box component={Skeleton} ml={1} variant='rectangular' width={130} height={18} />
            </Info>
          </Box>
        </Box>
        <Box component={Skeleton} width={'100%'} height={400} variant='rectangular' borderRadius={12} />
      </Box>
    );
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={2}>
        <IconButtonBack onClick={() => setSelected(null)}>
          <BackIcon />
        </IconButtonBack>
        <Box display={'flex'}>
          <Info>
            <AddressIcon fill='#438F68' />
            <InfoText>{getShortHash(data?.txHash || '')}</InfoText>
          </Info>
          <Info>
            <ADAGreen />
            <InfoText>{formatADA(data?.totalFee || 0)}</InfoText>
          </Info>
          <Info>
            <TimeIcon />
            <InfoText>{moment(data?.time).format('MM/DD/yyyy HH:mm:ss')}</InfoText>
          </Info>
        </Box>
      </Box>
      <Box>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'}>
          <Box ref={adaHolderRef} width={190} height={245} position={'relative'}>
            <SPOStalking />
            <CustomTooltip title={data?.poolName}>
              <PoolName> {data?.poolName}</PoolName>
            </CustomTooltip>
            <PopoverStyled
              render={({ handleClick }) => (
                <ButtonSPO
                  ref={SPOInfoRef}
                  component={IconButton}
                  left={'33%'}
                  onClick={() => SPOInfoRef?.current && handleClick(SPOInfoRef.current)}
                >
                  <SPOInfo />
                </ButtonSPO>
              )}
              content={
                <Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool ID:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>
                      {getShortHash(data?.poolView || '')}
                    </PoolNamePopup>
                    <CopyButton text={data?.poolView} />
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Box fontSize='1.125rem' color={({ palette }) => palette.grey[400]}>
                      Pool name:
                    </Box>
                    <PoolNamePopup to={details.delegation(data?.poolView)}>{data?.poolName}</PoolNamePopup>
                  </Box>
                </Box>
              }
            />
            <PopoverStyled
              render={({ handleClick }) => (
                <ButtonSPO
                  ref={SPOKeyRef}
                  component={IconButton}
                  left={'52%'}
                  onClick={() => SPOKeyRef?.current && handleClick(SPOKeyRef.current)}
                >
                  <SPOKey fill='#438F68' />
                </ButtonSPO>
              )}
              content={
                <Box display={'flex'} alignItems={'center'}>
                  {data?.stakeKeys && data.stakeKeys.length > 0 && (
                    <>
                      <SPOKey fill='#108AEF' />
                      <PoolNamePopup to={details.stake(data?.stakeKeys[0] || '')}>
                        {getShortWallet(data?.stakeKeys[0] || '')}
                      </PoolNamePopup>
                      <CopyButton text={data?.stakeKeys[0]} />
                    </>
                  )}
                </Box>
              }
            />
          </Box>

          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Box display={'flex'} flex={1}>
              <PopoverStyled
                render={({ handleClick }) => (
                  <HoldBox ref={holdRef} ml={1}>
                    <Box>
                      <Box component={'span'} fontSize={'18px'} fontWeight={'bold'} mr={1}>
                        {formatADA(data?.deposit || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => holdRef?.current && handleClick(holdRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </HoldBox>
                )}
                content={<PopupStaking hash={data?.txHash || ''} />}
              />
              <PopoverStyled
                render={({ handleClick }) => (
                  <FeeBox ref={feeRef}>
                    <Box>
                      <Box component={'span'} fontSize={'18px'} fontWeight={'bold'} mr={1}>
                        {formatADA(data?.fee || 0)}
                      </Box>
                      <ADAicon fontSize='18px' />
                    </Box>
                    <IconButton onClick={() => feeRef?.current && handleClick(feeRef.current)}>
                      <ButtonListIcon />
                    </IconButton>
                  </FeeBox>
                )}
                content={<PopupStaking hash={data?.txHash || ''} />}
              />
            </Box>
          </Box>
          <Box ref={cadarnoSystemRef} height={215} width={190}>
            {/* <CadarnoSystemIcon /> */}
            <img src={cadarnoSystem} alt='carrdano' />
          </Box>

          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              zIndex: '-1'
            }}
          >
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={holdRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
              fromRef={holdRef}
              toRef={feeRef}
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={feeRef}
              toRef={cadarnoSystemRef}
              pointTo='border'
              pointFrom='border'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={adaHolderRef}
              toRef={fake1Ref}
              orient='horizontal'
              pointFrom='border'
              pointTo='center'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake1Ref}
              toRef={registrationRef}
              pointTo='border'
              pointFrom='center'
              orient='vertical'
            />
            <Line
              containerPosition={containerPosition}
              fromRef={registrationRef}
              toRef={fake2Ref}
              orient='vertical'
              pointFrom='border'
              pointTo='center'
            />
            <ArrowDiagram
              containerPosition={containerPosition}
              fromRef={fake2Ref}
              toRef={cadarnoSystemRef}
              orient='horizontal'
              pointFrom='center'
              pointTo='border'
            />
          </svg>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} position={'relative'} top={'-60px'}>
          <Box ref={fake1Ref} width={'190px'} height={220}></Box>
          <Box
            ref={registrationRef}
            width={220}
            height={220}
            component={IconButton}
            p={0}
            onClick={() => setOpenModal(true)}
          >
            <img style={{ marginLeft: '5px' }} src={RegistrationCertificate} alt='RegistrationCertificateIcon' />
          </Box>
          <Box ref={fake2Ref} width={'190px'} height={220}></Box>
        </Box>
      </Box>
      <RegistrationCertificateModal data={data} handleCloseModal={() => setOpenModal(false)} open={openModal} />
    </Box>
  );
};

const RegistrationCertificateModal = ({
  data,
  ...props
}: {
  open: boolean;
  data: SPORegistrationDetail | null;
  handleCloseModal: () => void;
}) => {
  return (
    <StyledModal {...props} title='Pool registration certificate'>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Transaction ID
            </Box>
            {data && (
              <Box>
                <Link to={details.transaction(data?.txHash || '')}>{getShortHash(data?.txHash || '')}</Link>{' '}
                <CopyButton text={data?.txHash || ''} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Pool ID
            </Box>
            {data && (
              <Box>
                <Link to={details.delegation(data?.poolView || '')}>{getShortHash(data?.poolView || '')}</Link>{' '}
                <CopyButton text={data?.poolView || ''} />
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              VRF Key
            </Box>
            {data && (
              <Box>
                <Box display={'inline'} fontSize='0.875rem' color={({ palette }) => palette.blue[800]}>
                  {getShortHash(data?.vrfKey || '')}
                </Box>{' '}
                <CopyButton text={data?.vrfKey || ''} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Owners
            </Box>
            {data && (
              <>
                {(data.stakeKeys || []).map((item) => (
                  <>
                    <Box key={item}>
                      <Link to={details.stake(item || '')}>{getShortWallet(item)}</Link>{' '}
                      <CopyButton text={item || ''} />
                    </Box>
                  </>
                ))}
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Reward Account
            </Box>
            {data && (
              <Box>
                <Link to={details.stake(data?.rewardAccount || '')}>{getShortWallet(data?.rewardAccount || '')}</Link>{' '}
                <CopyButton text={data?.rewardAccount || ''} />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Margin
            </Box>
            {data && (
              <Box display={'inline'} fontSize='0.875rem'>
                {data?.margin}%
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Pledge
            </Box>
            {data && (
              <Box display={'inline'} fontSize='0.875rem'>
                {formatADA(data?.pledge)} <ADAicon />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor={({ palette }) => alpha(palette.grey[300], 0.1)} p={3}>
            <Box fontWeight={'bold'} fontSize={'0.875rem'} color={({ palette }) => palette.grey[400]}>
              Cost
            </Box>
            {data && (
              <Box display={'inline'} fontSize='0.875rem'>
                {formatADA(data?.cost)} <ADAicon />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledModal>
  );
};

const Link = styled(LinkDom)(({ theme }) => ({
  fontSize: '0.875rem',
  color: `${theme.palette.blue[800]} !important`
}));
