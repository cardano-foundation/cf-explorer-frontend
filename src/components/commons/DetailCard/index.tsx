import React from 'react';
import { alpha, Grid, LinearProgress, Skeleton, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import infoIcon from '../../../commons/resources/images/infoIcon.svg';
import blockImg from '../../../commons/resources/images/block.png';
import slotImg from '../../../commons/resources/images/slot.png';
import { details } from '../../../commons/routers';
import { MAX_SLOT_EPOCH } from '../../../commons/utils/constants';
import { Policy } from '../../../commons/resources';
import { numberWithCommas } from '../../../commons/utils/helper';
import ProgressCircle from '../ProgressCircle';
import {
  CardInfo,
  CardInfoItem,
  CardProgress,
  EpochNumber,
  EpochText,
  InfoIcon,
  InfoTitle,
  InfoValue,
  PolicyBody,
  PolicyBodyDetail,
  PolicyBodyTitle,
  PolicyHeader,
  TokenDetail,
  TokenDetailDecimal,
  TokenDetailDetail,
  TokenDetailSupply,
  TokenDetailTitle,
  TokenWrapper,
  Wrapper
} from './styles';

interface DetailCardProps {
  listDetails: { title?: string; value: React.ReactNode }[];
  loading: boolean;
  joinCard?: boolean;
  progress?: {
    epoch: number;
    block: number;
    currentSlot: number;
    gradientId?: string;
  };
  delegationPools?: {
    poolSize: React.ReactNode;
    stakeLimit: React.ReactNode;
    delegators: number;
    satulation: number;
  };
  tokenDetail?: {
    decimal?: number;
    totalSupply?: number;
  };
}

const DetailCard: React.FC<DetailCardProps> = ({
  listDetails,
  progress,
  loading,
  joinCard = false,
  tokenDetail,
  delegationPools
}) => {
  if (loading) {
    return (
      <Wrapper container spacing={2}>
        <Grid item md={7} xs={12}>
          <Skeleton style={{ height: 250, borderRadius: 10 }} variant='rectangular' />
        </Grid>
        <Grid item md={5} xs={12}>
          <Skeleton style={{ height: 250, borderRadius: 10 }} variant='rectangular' />
        </Grid>
      </Wrapper>
    );
  }
  const renderCard = () => {
    if (progress) {
      return (
        <>
          <ProgressCircle percent={(progress.currentSlot / MAX_SLOT_EPOCH) * 100}>
            <EpochNumber>{progress.epoch}</EpochNumber>
            <EpochText>EPOCH</EpochText>
          </ProgressCircle>
          <div className={styles.data}>
            <div className={styles.progessInfo}>
              <div className={styles.row}>
                <img className={styles.img} src={blockImg} alt='Block Icon' />
                <div>
                  <div className={styles.title}>Block</div>
                  <Link className={`${styles.fwBold} ${styles.link}`} to={details.block(progress.block)}>
                    {progress.block}
                  </Link>
                </div>
              </div>
              <div className={styles.row}>
                <img className={styles.img} src={slotImg} alt='Slot Icon' />
                <div>
                  <div className={styles.title}>Slot</div>
                  <div>
                    <span className={styles.fwBold}>{progress.currentSlot}</span> / {MAX_SLOT_EPOCH}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (delegationPools) {
      return (
        <div className={styles.delegation}>
          {Object.keys(delegationPools).map((k, i) => {
            return (
              <div className={styles.detailItem} key={i}>
                <div>
                  <img src={infoIcon} alt='info' className={styles.img} />
                </div>
                <div className={styles.row}>
                  <div style={{ minWidth: 100 }}>
                    {delegationPoolsTitle[k as keyof Required<DetailCardProps>['delegationPools']] || 0}:
                  </div>
                  <div className={` ${styles.fwBold} ${styles.value}`}>
                    {delegationPools[k as keyof Required<DetailCardProps>['delegationPools']] || 0}
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.fullWidth}>
            <StyledLinearProgress variant='determinate' value={+delegationPools.satulation || 0} />
          </div>
        </div>
      );
    }

    if (tokenDetail) {
      return (
        <TokenWrapper>
          <PolicyHeader>
            <img src={Policy} alt='Policy Script Icon' />
            <h3>Policy Script</h3>
          </PolicyHeader>
          <PolicyBody>
            <div>
              <PolicyBodyTitle>WETH</PolicyBodyTitle>
              <PolicyBodyDetail>Wrapped ether bridged through Nomda</PolicyBodyDetail>
            </div>
            <img src={infoIcon} alt='info' />
          </PolicyBody>
          <TokenDetail>
            <TokenDetailSupply>
              <TokenDetailTitle>Total Supply</TokenDetailTitle>
              <TokenDetailDetail>{numberWithCommas(tokenDetail.totalSupply)}</TokenDetailDetail>
            </TokenDetailSupply>
            <TokenDetailDecimal>
              <TokenDetailTitle>Decimal</TokenDetailTitle>
              <TokenDetailDetail>{tokenDetail.decimal}</TokenDetailDetail>
            </TokenDetailDecimal>
          </TokenDetail>
        </TokenWrapper>
      );
    }

    return <></>;
  };

  return (
    <Wrapper container spacing={2}>
      <Grid item md={7} sm={12}>
        <CardInfo>
          {listDetails.map((item, idx) => (
            <CardInfoItem key={idx}>
              {item.title ? (
                <>
                  <InfoIcon src={infoIcon} alt='info' />
                  <InfoTitle>{item.title}:</InfoTitle>
                  <InfoValue>{item.value}</InfoValue>
                </>
              ) : (
                item.value
              )}
            </CardInfoItem>
          ))}
        </CardInfo>
      </Grid>
      <Grid item md={5} sm={12}>
        <CardProgress>{renderCard()}</CardProgress>
      </Grid>
    </Wrapper>
  );
};

export default DetailCard;

const delegationPoolsTitle = {
  poolSize: 'Pool size',
  stakeLimit: 'Stake limit',
  delegators: 'Delegators',
  satulation: 'Saturation'
};

const StyledLinearProgress = styled(LinearProgress)`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  border-radius: 34px;
  background: ${(props) => alpha(props.theme.palette.common.black, 0.1)};

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${(props) => props.theme.palette.gradient[0]};
  }
`;
