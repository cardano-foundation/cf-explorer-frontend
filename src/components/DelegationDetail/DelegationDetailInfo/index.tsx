import React from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
  AIcon,
  CalendarIcon,
  DelegatorIcon,
  DropIcon,
  HighestIcon,
  InfoIcon,
  RewardIcon,
  TickerIcon,
  UserIcon,
} from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import CustomTooltip from "../../commons/CustomTooltip";

import {
  BackButton,
  BackText,
  DataContainer,
  FlexGap10,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  InfoTitle,
  InfoValue,
  Item,
  PoolId,
  PoolIdSkeleton,
  PoolIdValue,
  StyledGrid,
  StyledImg,
  StyledLinearProgress,
} from "./styles";

interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId }) => {
  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton to={"/"}>
          <HiArrowLongLeft />
          <BackText>Back</BackText>
        </BackButton>
        <HeaderContainer>
          <HeaderTitle>
            <HeaderTitleSkeleton variant="rectangular" />
          </HeaderTitle>
        </HeaderContainer>
        <PoolId>
          <PoolIdSkeleton variant="rectangular" />
        </PoolId>
      </HeaderDetailContainer>
    );
  }

  return (
    <HeaderDetailContainer>
      <BackButton to={routers.DELEGATION_POOLS}>
        <HiArrowLongLeft />
        <BackText>Back</BackText>
      </BackButton>
      <HeaderContainer>
        <HeaderTitle>{data?.poolName || poolId}</HeaderTitle>
      </HeaderContainer>
      <PoolId>
        <CustomTooltip title={poolId} placement="top">
          <Link to={routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${poolId}`)}>
            <small>Pool Id: </small>
            <PoolIdValue>{poolId}</PoolIdValue>
          </Link>
        </CustomTooltip>
        <CopyButton text={poolId} />
      </PoolId>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} isTop={1}>
            <StyledImg src={TickerIcon} alt="Ticker Icon" />
            <InfoTitle>
              Ticker <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} isTop={1}>
            <StyledImg src={CalendarIcon} alt="Calendar Icon" />
            <InfoTitle>
              Created date <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>{data?.createDate || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} isTop={1}>
            <StyledImg src={RewardIcon} alt="Reward Icon" />
            <InfoTitle>
              Reward Account <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>
              {data?.rewardAccount ? (
                <>
                  <CustomTooltip placement="bottom" title={data?.rewardAccount || ""}>
                    <Link to={details.address(data?.rewardAccount )}>
                      {getShortWallet(data?.rewardAccount || "")}
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.rewardAccount || ""} />
                </>
              ) : (
                ""
              )}
            </InfoValue>
          </Item>
          <Item item xs={6} md={3} isTop={1}>
            <StyledImg src={UserIcon} alt="User Icon" />
            <InfoTitle>
              Owner Account <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>
              {data?.ownerAccount ? (
                <>
                  <CustomTooltip placement="bottom" title={data?.ownerAccount || ""}>
                    <Link to={details.address(data?.ownerAccount )}>
                      {getShortWallet(data?.ownerAccount || "")}
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.ownerAccount || ""} />
                </>
              ) : (
                ""
              )}
            </InfoValue>
          </Item>
        </StyledGrid>
        <StyledGrid container>
          <Item item xs={6} md={3}>
            <StyledImg src={DropIcon} alt="Drop Icon" />
            <InfoTitle>
              Pool size <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>
              <FlexGap10>
                {formatADA(data?.poolSize)}
                <img src={AIcon} alt={"ADA Icon"} />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <StyledImg src={HighestIcon} alt="Highest Icon" />
            <InfoTitle>
              Stake limit <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>
              <FlexGap10>
                {formatADA(data?.stakeLimit)}
                <img src={AIcon} alt={"ADA Icon"} />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <StyledImg src={DelegatorIcon} alt="Delegator Icon" />
            <InfoTitle>
              Delegators <img src={InfoIcon} alt="Info Icon" style={{ width: 14 }} />
            </InfoTitle>
            <InfoValue>{data?.delegators || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <InfoValue>
              <StyledLinearProgress variant="determinate" value={data?.saturation} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "9px" }}>
                <span style={{ fontSize: "14px", fontWeight: "400", opacity: "0.5" }}>Saturation</span>
                <span style={{ fontSize: "16px" }}>{data?.saturation || 0}%</span>
              </div>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
