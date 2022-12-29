import React, { useState } from "react";
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
  SaveOffIcon,
  SaveOnIcon,
  TickerIcon,
  UserIcon,
} from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import CopyButton from "../../commons/CopyButton";
import CustomTooltip from "../../commons/CustomTooltip";
import DropdownDetail from "../../commons/DropdownDetail";

import {
  BackButton,
  BackText,
  DataContainer,
  FlexGap10,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderTitle,
  HeaderTitleSkeleton,
  InfoImg,
  InfoTitle,
  InfoValue,
  Item,
  PoolId,
  PoolIdLabel,
  PoolIdSkeleton,
  PoolIdValue,
  SavingImg,
  StyledGrid,
  StyledImg,
  StyledLinearProgress,
  StyledTitle,
} from "./styles";

interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId, saving, setSaving }) => {
  const [isOpenReward, setOpenReward] = useState<boolean>(false);
  const [isOpenOwner, setOpenOwner] = useState<boolean>(false);

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
        <SavingImg src={saving ? SaveOnIcon : SaveOffIcon} alt="Save Icon" onClick={() => setSaving(!saving)} />
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
            <PoolIdLabel>Pool Id: </PoolIdLabel>
            <PoolIdValue>{poolId}</PoolIdValue>
          </Link>
        </CustomTooltip>
        <CopyButton text={poolId} />
      </PoolId>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={TickerIcon} alt="Ticker Icon" />
            <InfoTitle>
              <StyledTitle>
                Ticker <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={CalendarIcon} alt="Calendar Icon" />
            <InfoTitle>
              <StyledTitle>
                Created date <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.createDate || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={RewardIcon} alt="Reward Icon" />
            <InfoTitle>
              <StyledTitle>
                Reward Account <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
              <button
                onClick={() => {
                  setOpenReward(!isOpenReward);
                  setOpenOwner(false);
                }}
              >
                View all
              </button>
            </InfoTitle>
            <InfoValue>
              {data?.rewardAccounts ? (
                <>
                  <CustomTooltip placement="top" title={data?.rewardAccounts[0] || ""}>
                    <Link
                      to={details.address(data?.rewardAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                    >
                      {getShortWallet(data?.rewardAccounts[0] || "")}
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.rewardAccounts[0] || ""} />
                </>
              ) : (
                ""
              )}
            </InfoValue>
            {isOpenReward && (
              <DropdownDetail
                title="Reward account list"
                value={data?.rewardAccounts || []}
                close={() => setOpenReward(false)}
              />
            )}
          </Item>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={UserIcon} alt="User Icon" />
            <InfoTitle
              onClick={() => {
                setOpenOwner(!isOpenOwner);
                setOpenReward(false);
              }}
            >
              <StyledTitle>
                Owner Account <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
              <button
                onClick={() => {
                  setOpenOwner(!isOpenOwner);
                  setOpenReward(false);
                }}
              >
                View all
              </button>
            </InfoTitle>
            <InfoValue>
              {data?.ownerAccounts ? (
                <>
                  <CustomTooltip placement="top" title={data?.ownerAccounts[0] || ""}>
                    <Link
                      to={details.address(data?.ownerAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                    >
                      {getShortWallet(data?.ownerAccounts[0] || "")}
                    </Link>
                  </CustomTooltip>
                  <CopyButton text={data?.ownerAccounts[0] || ""} />
                </>
              ) : (
                ""
              )}
            </InfoValue>
            {isOpenOwner && (
              <DropdownDetail
                title="Owner address list"
                value={data?.ownerAccounts || []}
                close={() => setOpenOwner(false)}
              />
            )}
          </Item>
        </StyledGrid>
        <StyledGrid container>
          <Item item xs={6} md={3}>
            <StyledImg src={DropIcon} alt="Drop Icon" />
            <InfoTitle>
              <StyledTitle>
                Pool size <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
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
              <StyledTitle>
                Stake limit <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
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
              <StyledTitle>
                Delegators <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.delegators || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <InfoValue>
              <StyledLinearProgress variant="determinate" value={data?.saturation || 0} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "9px" }}>
                <span style={{ fontSize: "14px", fontWeight: "400", opacity: "0.5" }}>Saturation</span>
                <span style={{ fontSize: "16px" }}>{data?.saturation || 0}%</span>
              </div>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
      <SavingImg src={saving ? SaveOnIcon : SaveOffIcon} alt="Save Icon" onClick={() => setSaving(!saving)} />
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
