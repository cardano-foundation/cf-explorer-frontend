import { Box, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useHistory } from "react-router-dom";

import {
  CalendarIcon,
  DelegatorIcon,
  DropIcon,
  HighestIcon,
  RewardIcon,
  TickerIcon,
  UserIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, formatPercent, getShortWallet } from "src/commons/utils/helper";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownDetail from "src/components/commons/DropdownDetail";
import ADAicon from "src/components/commons/ADAIcon";
import { useScreen } from "src/commons/hooks/useScreen";

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
  StyledTitle
} from "./styles";

export interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId }) => {
  const history = useHistory();
  const [isOpenReward, setOpenReward] = useState<boolean>(false);
  const [isOpenOwner, setOpenOwner] = useState<boolean>(false);
  const { isMobile, isGalaxyFoldSmall } = useScreen();

  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton onClick={history.goBack}>
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
      </HeaderDetailContainer>
    );
  }

  return (
    <HeaderDetailContainer>
      <BackButton onClick={history.goBack}>
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
            <PoolIdValue>{isMobile ? getShortWallet(poolId) : poolId}</PoolIdValue>
          </Link>
        </CustomTooltip>
        <CopyButton text={poolId} />
      </PoolId>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={TickerIcon} alt="Ticker Icon" />
            <InfoTitle>
              <StyledTitle>Ticker</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <StyledImg src={CalendarIcon} alt="Calendar Icon" />
            <InfoTitle>
              <StyledTitle>Created At</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.createDate && formatDateTimeLocal(data.createDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <StyledImg src={RewardIcon} alt="Reward Icon" />
            <InfoTitle>
              <Box>
                <StyledTitle>Reward Account</StyledTitle>
                <InfoValue mt={"4px"}>
                  {data?.rewardAccounts ? (
                    <>
                      <CustomTooltip title={data?.rewardAccounts[0] || ""}>
                        <Box
                          component={Link}
                          to={details.stake(data?.rewardAccounts[0] || "")}
                          style={{ fontFamily: "var(--font-family-text)" }}
                          color={(theme) => `${theme.palette.secondary.main} !important`}
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
              </Box>
              {data?.rewardAccounts && data.rewardAccounts.length > 1 && (
                <ButtonViewAll
                  sx={{ color: (theme) => theme.palette.common.black }}
                  onClick={() => {
                    setOpenReward(!isOpenReward);
                    setOpenOwner(false);
                  }}
                >
                  View all
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenReward && (
              <DropdownDetail
                title="Reward account list"
                value={data?.rewardAccounts || []}
                close={() => setOpenReward(false)}
              />
            )}
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <StyledImg src={UserIcon} alt="User Icon" />
            <InfoTitle>
              <Box>
                <StyledTitle>Owner Account</StyledTitle>{" "}
                <InfoValue mt={"4px"}>
                  {data?.ownerAccounts ? (
                    <>
                      <CustomTooltip title={data?.ownerAccounts[0] || ""}>
                        <Box
                          component={Link}
                          color={(theme) => `${theme.palette.primary.main} !important`}
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
              </Box>
              {data?.ownerAccounts && data.ownerAccounts.length > 1 && (
                <ButtonViewAll
                  sx={{ color: (theme) => theme.palette.common.black }}
                  onClick={() => {
                    setOpenOwner(!isOpenOwner);
                    setOpenReward(false);
                  }}
                >
                  View all
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenOwner && (
              <DropdownDetail
                title="Owner address list"
                value={data?.ownerAccounts || []}
                close={() => setOpenOwner(false)}
                isStakeDetail={true}
              />
            )}
          </Item>
          <Item item xs={6} md={3}>
            <StyledImg src={DropIcon} alt="Drop Icon" />
            <InfoTitle>
              <StyledTitle>Pool size</StyledTitle>
            </InfoTitle>
            <InfoValue sx={{ wordBreak: "break-all" }}>
              <FlexGap10>
                {formatADAFull(data?.poolSize)}
                <ADAicon />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <StyledImg src={HighestIcon} alt="Highest Icon" />
            <InfoTitle>
              <StyledTitle>Stake limit</StyledTitle>
            </InfoTitle>
            <InfoValue>
              <FlexGap10>
                {formatADAFull(data?.stakeLimit)}
                <ADAicon />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <StyledImg src={DelegatorIcon} alt="Delegator Icon" />
            <InfoTitle>
              <StyledTitle>Delegators</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.delegators || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <InfoValue>
              <StyledLinearProgress
                variant="determinate"
                saturation={data?.saturation || 0}
                value={data?.saturation ? (data?.saturation > 100 ? 100 : data?.saturation) : 0}
              />
              <Box
                display="flex"
                flexDirection={isGalaxyFoldSmall ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isGalaxyFoldSmall ? "flex-start" : "flex-end"}
                marginTop="9px"
              >
                <Box
                  component={"span"}
                  mt={1}
                  color={({ palette }) => palette.secondary.light}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Saturation
                </Box>
                <Box fontSize={16}>{formatPercent(data?.saturation ? data?.saturation / 100 : 0)}</Box>
              </Box>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
