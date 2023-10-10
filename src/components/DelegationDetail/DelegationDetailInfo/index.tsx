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
import { formatADAFull, formatDateTimeLocal, formatPercent, getShortWallet } from "src/commons/utils/helper";
import ADAicon from "src/components/commons/ADAIcon";
import BookmarkButton from "src/components/commons/BookmarkIcon";
import CopyButton from "src/components/commons/CopyButton";
import CustomIcon from "src/components/commons/CustomIcon";
import { CommonSkeleton } from "src/components/commons/CustomSkeleton";
import CustomTooltip from "src/components/commons/CustomTooltip";
import DropdownDetail from "src/components/commons/DropdownDetail";
import FormNowMessage from "src/components/commons/FormNowMessage";

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

export interface IDelegationDetailInfo {
  data: DelegationOverview | null;
  loading: boolean;
  poolId: string;
  lastUpdated?: number;
}

const DelegationDetailInfo: React.FC<IDelegationDetailInfo> = ({ data, loading, poolId, lastUpdated }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const history = useHistory();
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [isOpenReward, setOpenReward] = useState<boolean>(false);
  const [isOpenOwner, setOpenOwner] = useState<boolean>(false);
  const { isMobile, isGalaxyFoldSmall } = useScreen();

  if (loading) {
    return (
      <HeaderDetailContainer>
        <BackButton onClick={history.goBack}>
          <HiArrowLongLeft color={theme.palette.secondary.light} />
          <BackText>{t("common.back")}</BackText>
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

  return (
    <HeaderDetailContainer>
      <BackButton onClick={history.goBack}>
        <HiArrowLongLeft color={theme.palette.secondary.light} />
        <BackText>{t("common.back")}</BackText>
      </BackButton>
      <HeaderContainer>
        <Box display={"flex"} alignItems={"center"} flex={4}>
          <CustomTooltip title={data?.poolName || poolId}>
            <HeaderTitle>{data?.poolName || poolId}</HeaderTitle>
          </CustomTooltip>
          <BookmarkButton keyword={poolId} type="POOL" />
        </Box>
        {data?.logoUrl && !isErrorImage && (
          <Box
            bgcolor={theme.palette.common.white}
            border={`1px solid ${theme.isDark ? theme.palette.secondary[700] : theme.palette.primary[200]}`}
            borderRadius={1}
            component={"img"}
            src={data?.logoUrl || ""}
            width={"64px"}
            onError={(e) => {
              if (e.type === "error") setIsErrorImage(true);
            }}
          />
        )}
      </HeaderContainer>
      <PoolId>
        <PoolIdLabel>{t("common.poolId")}: </PoolIdLabel>
        <CustomTooltip title={poolId}>
          <Link to={details.delegation(poolId)}>
            <PoolIdValue>{isMobile ? getShortWallet(poolId) : poolId}</PoolIdValue>
          </Link>
        </CustomTooltip>
        <CopyButton text={poolId} />
      </PoolId>
      {data?.hashView && (
        <PoolId>
          <PoolIdLabel>{t("common.poolhash")}: </PoolIdLabel>
          <CustomTooltip title={data?.hashView || ""}>
            <Link to={details.delegation(poolId)}>
              <PoolIdValue>{isMobile ? getShortWallet(data?.hashView) : data?.hashView}</PoolIdValue>
            </Link>
          </CustomTooltip>
          <CopyButton text={data?.hashView} />
        </PoolId>
      )}
      {data?.homepage && (
        <PoolId>
          <PoolIdLabel>{t("common.poolHomepage")}: </PoolIdLabel>
          <PoolHomepage href={data?.homepage} target="_blank" rel="noreferrer">
            {data?.homepage}
          </PoolHomepage>
        </PoolId>
      )}
      {data?.description && (
        <PoolDescriptionWrapper>
          <PoolIdLabel>{t("common.poolDescription")}: </PoolIdLabel>
          <PoolDescription>{data?.description}</PoolDescription>
        </PoolDescriptionWrapper>
      )}
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <DataContainer>
        <StyledGrid container>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.light} icon={TickerIconComponent} height={22} />
            <InfoTitle>
              <StyledTitle>{t("common.ticker")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.tickerName || ""}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={CalendarIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("createdAt")}</StyledTitle>
            </InfoTitle>
            <InfoValue>{data?.createDate && formatDateTimeLocal(data.createDate || "")}</InfoValue>
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={RewardIconComponent} />
            <InfoTitle>
              <Box>
                <StyledTitle>{t("rewardAccount")}</StyledTitle>
                <InfoValue mt={"4px"}>
                  {data?.rewardAccounts ? (
                    <>
                      <CustomTooltip title={data?.rewardAccounts[0] || ""}>
                        <Box
                          component={Link}
                          to={details.stake(data?.rewardAccounts[0] || "")}
                          style={{ fontFamily: "var(--font-family-text)" }}
                          color={(theme) => `${theme.palette.primary.main} !important`}
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
                  {t("common.viewAll")}
                </ButtonViewAll>
              )}
            </InfoTitle>

            {isOpenReward && (
              <DropdownDetail
                title={t("glossary.rewardAccountList")}
                value={data?.rewardAccounts || []}
                close={() => setOpenReward(false)}
              />
            )}
          </Item>
          <Item item xs={6} md={3} top={1} sx={{ position: "relative" }}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={UserIconComponent} />
            <InfoTitle>
              <Box>
                <StyledTitle>{t("ownerAccount")}</StyledTitle>{" "}
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
                title={t("glossary.ownerAddressList")}
                value={data?.ownerAccounts || []}
                close={() => setOpenOwner(false)}
                isStakeDetail={true}
              />
            )}
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={DropIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("glossary.poolSize")}</StyledTitle>
            </InfoTitle>
            <InfoValue sx={{ wordBreak: "break-all" }}>
              <FlexGap10>
                {formatADAFull(data?.poolSize)}
                <ADAicon />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={24} icon={HighestIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("stakeLimit")}</StyledTitle>
            </InfoTitle>
            <InfoValue>
              <FlexGap10>
                {formatADAFull(data?.stakeLimit)}
                <ADAicon />
              </FlexGap10>
            </InfoValue>
          </Item>
          <Item item xs={6} md={3}>
            <CustomIcon fill={theme.palette.secondary.light} height={22} icon={DelegatorIconComponent} />
            <InfoTitle>
              <StyledTitle>{t("delegators")}</StyledTitle>
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
                  {t("saturation")}
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
