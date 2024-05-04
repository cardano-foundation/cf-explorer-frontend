import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link, useHistory } from "react-router-dom";

import { useScreen } from "src/commons/hooks/useScreen";
import {
  CalendarIconComponent,
  DelegatorIconComponent,
  DropIconComponent,
  HighestIconComponent,
  RewardIconComponent,
  TickerIconComponent,
  UserIconComponent
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { formatADAFull, formatDateTimeLocal, formatPercent } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownDetail from "src/components/commons/DropdownDetail";
import FormNowMessage from "src/components/commons/FormNowMessage";
import DynamicEllipsisText from "src/components/DynamicEllipsisText";
import { TruncateSubTitleContainer } from "src/components/share/styled";
import DatetimeTypeTooltip from "src/components/commons/DatetimeTypeTooltip";

import {
  BackButton,
  BackText,
  ButtonViewAll,
  DataContainer,
  FlexGap10,
  HeaderContainer,
  HeaderDetailContainer,
  HeaderStatus,
  HeaderTitle,
  HeaderTitleSkeleton,
  InfoTitle,
  InfoValue,
  Item,
  PoolDescription,
  PoolDescriptionWrapper,
  PoolHomepage,
  PoolId,
  PoolIdLabel,
  PoolIdSkeleton,
  PoolIdValue,
  StyledGrid,
  StyledLinearProgress,
  StyledTitle,
  TimeDuration
} from "./styles";
import ToStakeLifCycleButton from "../../StakingLifeCycle/ToStakeLifeCycleButton";

export interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
  lastUpdated?: number;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId, lastUpdated }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { width, isGalaxyFoldSmall } = useScreen();
  const history = useHistory();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isOpenReward, setOpenReward] = useState<boolean>(false);
  const [isOpenOwner, setOpenOwner] = useState<boolean>(false);

  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} />
          <BackText data-testid="poolDetail.back">{t("common.back")}</BackText>
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
          <CommonSkeleton variant="rectangular" height={250} width="100%" />
        </Box>
      </HeaderDetailContainer>
    );
  }

  const isPoolName = !!data?.poolName;

  interface HeaderBookmarkProps {
    justifyStyle: string;
  }

  const HeaderBookmark: React.FC<HeaderBookmarkProps> = ({ justifyStyle }) => {
    return (
      <Box display="flex" alignItems="center" justifyContent={justifyStyle} flex="1">
        <Box display="flex" alignItems="center" width={"100%"}>
          <Box marginLeft={isPoolName ? 0 : 3}>
            <BookmarkButton keyword={poolId} type="POOL" />
          </Box>
          <Box marginLeft={width < 400 ? 0 : 1}>
            <HeaderStatus status={data?.poolStatus}>{data?.poolStatus}</HeaderStatus>
          </Box>
          <Box marginLeft={"auto"}>
            <ToStakeLifCycleButton address={poolId} from={"poolDetail"} />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <HeaderDetailContainer>
      <BackButton data-testid="poolDetail.back" onClick={history.goBack}>
        <HiArrowLongLeft color={theme.palette.secondary.light} />
        <BackText>{t("common.back")}</BackText>
      </BackButton>
      <HeaderContainer>
        <Box display={"flex"} alignItems={"center"} width={"inherit"}>
          {data?.logoUrl && !isErrorImage && (
            <Box
              bgcolor={theme.palette.common.white}
              border={`1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`}
              borderRadius={1}
              justifySelf="end"
              marginRight="10px"
              component="img"
              src={data?.logoUrl || ""}
              width="64px"
              onError={(e) => {
                if (e.type === "error") setIsErrorImage(true);
              }}
            />
          )}
          <CustomTooltip title={data?.poolName || data?.poolView || poolId}>
            <HeaderTitle>
              {data?.poolName ? (
                data?.poolName
              ) : (
                <TruncateSubTitleContainer>
                  <DynamicEllipsisText
                    value={data?.poolName || data?.poolView || poolId}
                    sxFirstPart={{ maxWidth: width > 600 ? "calc(100% - 130px)" : "calc(100% - 50px)" }}
                    postfix={5}
                    isNoLimitPixel={true}
                  />
                </TruncateSubTitleContainer>
              )}
            </HeaderTitle>
          </CustomTooltip>
          {width > 600 && <HeaderBookmark justifyStyle={"space-between"} />}
        </Box>
      </HeaderContainer>
      {width < 600 && <HeaderBookmark justifyStyle={"flex-end"} />}
      <PoolId>
        <PoolIdLabel data-testid="poolDetail.poolIdTitle">{t("common.poolId")}: </PoolIdLabel>
        <Link data-testid="poolDetail.poolIdValue" to={details.delegation(data?.poolView)}>
          <PoolIdValue>
            <TruncateSubTitleContainer>
              <DynamicEllipsisText value={data?.poolView || ""} isCopy isTooltip />
            </TruncateSubTitleContainer>
          </PoolIdValue>
        </Link>
      </PoolId>
      {data?.hashView && (
        <PoolId>
          <PoolIdLabel data-testid="poolDetail.poolHashTitle">{t("common.poolhash")}: </PoolIdLabel>
          <Link data-testid="poolDetail.poolHashValue" to={details.delegation(data?.hashView)}>
            <PoolIdValue>
              <TruncateSubTitleContainer>
                <DynamicEllipsisText value={data?.hashView || ""} isCopy isTooltip />
              </TruncateSubTitleContainer>
            </PoolIdValue>
          </Link>
        </PoolId>
      )}
      {data?.homepage && (
        <PoolId>
          <PoolIdLabel data-testid="poolDetail.poolHomepageTitle">{t("common.poolHomepage")}: </PoolIdLabel>
          <PoolHomepage
            data-testid="poolDetail.poolHomepageValue"
            href={data?.homepage}
            target="_blank"
            rel="noreferrer"
          >
            {data?.homepage}
          </PoolHomepage>
        </PoolId>
      )}
      {data?.description && (
        <PoolDescriptionWrapper>
          <PoolIdLabel data-testid="poolDetail.poolDescriptionTitle">{t("common.poolDescription")}: </PoolIdLabel>
          <PoolDescription data-testid="poolDetail.poolDescriptionValue">{data?.description}</PoolDescription>
        </PoolDescriptionWrapper>
      )}
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.main} icon={TickerIconComponent} height={22} />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.tickerTitle">{t("common.ticker")}</StyledTitle>
            </InfoTitle>
            <InfoValue data-testid="poolDetail.tickerValue">{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.main} height={22} icon={CalendarIconComponent} />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.createdAtTitle">{t("createdAt")}</StyledTitle>
            </InfoTitle>
            <DatetimeTypeTooltip>
              <InfoValue data-testid="poolDetail.createdAtValue">
                {data?.createDate && formatDateTimeLocal(data.createDate || "")}
              </InfoValue>
            </DatetimeTypeTooltip>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <CustomIcon fill={theme.palette.secondary.main} height={22} icon={RewardIconComponent} />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.rewardAccountTitle">{t("rewardAccount")}</StyledTitle>
              <InfoValue data-testid="poolDetail.rewardAccountValue" mt={"4px"}>
                {data?.rewardAccounts ? (
                  <>
                    <Box
                      component={Link}
                      to={details.stake(data?.rewardAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                      color={(theme) => `${theme.palette.primary.main} !important`}
                    >
                      <DynamicEllipsisText value={data?.rewardAccounts[0] || ""} isCopy isTooltip whiteSpace="normal" />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </InfoValue>
              {data?.rewardAccounts && data.rewardAccounts.length > 1 && (
                <ButtonViewAll
                  data-testid="poolDetail.viewAllRewardAccount"
                  sx={{ color: (theme) => theme.palette.common.black }}
                  onClick={() => {
                    setOpenReward(!isOpenReward);
                    setOpenOwner(false);
                  }}
                >
                  {t("common.viewAll")}
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenReward && (
              <DropdownDetail
                data-testid="poolDetail.rewardAccountList"
                title={t("glossary.rewardAccountList")}
                value={data?.rewardAccounts || []}
                close={() => setOpenReward(false)}
              />
            )}
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }} width={"100%"}>
            <CustomIcon fill={theme.palette.secondary.main} height={22} icon={UserIconComponent} />
            <InfoTitle>
              <Box width={"100%"}>
                <StyledTitle data-testid="poolDetail.ownerAccountTitle">{t("ownerAccount")}</StyledTitle>{" "}
                <InfoValue data-testid="poolDetail.ownerAccountValue" mt={"4px"}>
                  {data?.ownerAccounts ? (
                    <Box
                      component={Link}
                      color={(theme) => `${theme.palette.primary.main} !important`}
                      to={details.stake(data?.ownerAccounts[0] || "")}
                      style={{ fontFamily: "var(--font-family-text)" }}
                    >
                      <DynamicEllipsisText value={data?.ownerAccounts[0] || ""} isCopy isTooltip whiteSpace="normal" />
                    </Box>
                  ) : (
                    ""
                  )}
                </InfoValue>
              </Box>
              {data?.ownerAccounts && data.ownerAccounts.length > 1 && (
                <ButtonViewAll
                  data-testid="poolDetail.viewAllOwnerAccount"
                  sx={{
                    color: (theme) => theme.palette.secondary[0],
                    background: (theme) => theme.palette.primary.main,
                    border: (theme) => `1px solid ${theme.palette.primary[200]}`
                  }}
                  onClick={() => {
                    setOpenOwner(!isOpenOwner);
                    setOpenReward(false);
                  }}
                >
                  {t("common.viewAll")}
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenOwner && (
              <DropdownDetail
                data-testid="poolDetail.ownerAddressList"
                title={t("glossary.ownerAddressList")}
                value={data?.ownerAccounts || []}
                close={() => setOpenOwner(false)}
                isStakeDetail={true}
              />
            )}
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon
              fill={theme.palette.secondary.main}
              height={24}
              icon={DropIconComponent}
              style={{ marginTop: "5px" }}
            />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.poolSizeTitle">{t("glossary.poolSize")}</StyledTitle>
            </InfoTitle>
            <InfoValue data-testid="poolDetail.poolSizeValue" sx={{ wordBreak: "break-word" }}>
              <FlexGap10>
                {data?.poolSize != null ? formatADAFull(data?.poolSize) : t("common.N/A")}
                {data?.poolSize != null ? (
                  <Box width={16}>
                    <ADAicon />
                  </Box>
                ) : null}
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.main} height={24} icon={HighestIconComponent} />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.stakeLimitTitle">{t("stakeLimit")}</StyledTitle>
            </InfoTitle>
            <InfoValue data-testid="poolDetail.stakeLimitValue">
              {data?.stakeLimit != null ? (
                <FlexGap10>
                  {formatADAFull(data?.stakeLimit)}
                  <Box width={16}>
                    <ADAicon />
                  </Box>
                </FlexGap10>
              ) : (
                <FlexGap10>{t("common.N/A")}</FlexGap10>
              )}
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.main} height={22} icon={DelegatorIconComponent} />
            <InfoTitle>
              <StyledTitle data-testid="poolDetail.delegatorsTitle">{t("delegators")}</StyledTitle>
            </InfoTitle>
            <InfoValue data-testid="poolDetail.delegatorsValue">{data?.delegators || ""}</InfoValue>
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
                alignItems={isGalaxyFoldSmall ? "flex-start" : "center"}
                marginTop="17px"
                gap={"4px"}
              >
                <Box
                  data-testid="poolDetail.saturationTitle"
                  component={"span"}
                  color={({ palette }) => palette.secondary.light}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {t("saturation")}
                </Box>
                {data?.saturation != null ? (
                  <Box data-testid="poolDetail.saturationValue" fontSize={16}>
                    {formatPercent(data?.saturation ? data?.saturation / 100 : 0)}
                  </Box>
                ) : (
                  <FlexGap10> {t("common.N/A")}</FlexGap10>
                )}
              </Box>
            </InfoValue>
          </Item>
        </StyledGrid>
      </DataContainer>
    </HeaderDetailContainer>
  );
};

export default DelegationDetailInfo;
