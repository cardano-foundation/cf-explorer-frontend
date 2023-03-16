import { Box, Skeleton } from "@mui/material";
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
  TickerIcon,
  UserIcon,
} from "../../../commons/resources";
import { details, routers } from "../../../commons/routers";
import { formatADAFull, formatDateTimeLocal, formatPercent, getShortWallet } from "../../../commons/utils/helper";
import BookmarkButton from "../../commons/BookmarkIcon";
import CopyButton from "../../commons/CopyButton";
import CustomTooltip from "../../commons/CustomTooltip";
import DropdownDetail from "../../commons/DropdownDetail";

import {
  BackButton,
  BackText,
  ButtonViewAll,
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
        <Box borderRadius={10} overflow="hidden">
          <Skeleton variant="rectangular" height={250} width="100%" />
        </Box>
        {/* <SavingImg src={saving ? SaveOnIcon : SaveOffIcon} alt="Save Icon" onClick={() => setSaving(!saving)} /> */}
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
        <CustomTooltip title={data?.poolName || poolId}>
          <HeaderTitle>{data?.poolName || poolId}</HeaderTitle>
        </CustomTooltip>
        <BookmarkButton keyword={poolId} type="POOL" />
      </HeaderContainer>
      <PoolId>
        <CustomTooltip title={poolId}>
          <Link to={details.delegation(poolId)}>
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
            <InfoValue>{data?.createDate && formatDateTimeLocal(data.createDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={RewardIcon} alt="Reward Icon" />
            <InfoTitle>
              <StyledTitle>
                Reward Account <InfoImg src={InfoIcon} alt="Info Icon" />
              </StyledTitle>
              {data?.rewardAccounts && data.rewardAccounts.length > 1 && (
                <ButtonViewAll
                  sx={{ color: theme => theme.palette.common.black }}
                  onClick={() => {
                    setOpenReward(!isOpenReward);
                    setOpenOwner(false);
                  }}
                >
                  View all
                </ButtonViewAll>
              )}
            </InfoTitle>
            <InfoValue>
              {data?.rewardAccounts ? (
                <>
                  <CustomTooltip title={data?.rewardAccounts[0] || ""}>
                    <Box
                      component={Link}
                      to={details.stake(data?.rewardAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                      color={theme => `${theme.palette.secondary.main} !important`}
                    >
                      {getShortWallet(data?.rewardAccounts[0] || "")}
                    </Box>
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
              {data?.ownerAccounts && data.ownerAccounts.length > 1 && (
                <ButtonViewAll
                sx={{ color: theme => theme.palette.common.black }}
                  onClick={() => {
                    setOpenOwner(!isOpenOwner);
                    setOpenReward(false);
                  }}
                >
                  View all
                </ButtonViewAll>
              )}
            </InfoTitle>
            <InfoValue>
              {data?.ownerAccounts ? (
                <>
                  <CustomTooltip title={data?.ownerAccounts[0] || ""}>
                    <Box
                      component={Link}
                      color={theme => `${theme.palette.secondary.main} !important`}
                      to={details.stake(data?.ownerAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                    >
                      {getShortWallet(data?.ownerAccounts[0] || "")}
                    </Box>
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
                {formatADAFull(data?.poolSize)}
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
                {formatADAFull(data?.stakeLimit)}
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
                <span style={{ fontSize: "16px" }}>{formatPercent(data?.saturation || 0)}</span>
              </div>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
