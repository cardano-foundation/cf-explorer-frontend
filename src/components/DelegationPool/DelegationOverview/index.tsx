import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  CurentEpochPool,
  CurentEpochPoolDark,
  LiveStakeDarkIcon,
  LiveStakeIcon,
  RocketPoolDarkIcon,
  RocketPoolIcon,
  TotalPoolDarkIcon,
  TotalPoolIcon
} from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { DATE_FORMAT, MAX_SLOT_EPOCH } from "src/commons/utils/constants";
import { formatADA, formatADAFull, numberWithCommas } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import FormNowMessage from "src/components/commons/FormNowMessage";
import CustomTooltip from "src/components/commons/CustomTooltip";
import ADAicon from "src/components/commons/ADAIcon";

import {
  PoolTitle,
  PoolValue,
  StyledCard,
  StyledCustomIcon,
  StyledImg,
  StyledLinearProgress,
  StyledSkeleton,
  TimeDuration
} from "./styles";

const OverViews: React.FC = () => {
  const { t } = useTranslation();
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);
  const theme = useTheme();
  const { data, loading, lastUpdated } = useFetch<OverViewDelegation>(API.DELEGATION.HEADER, undefined, false, blockNo);

  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xl={3} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>{" "}
        <Grid item xl={3} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
      </Grid>
    );
  }

  const slot = moment.utc(currentEpoch?.endTime, DATE_FORMAT).isAfter(moment().utc())
    ? (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH
    : MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;
  const duration = moment.duration(countdown ? countdown : 0, "second");
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return (
    <Card title={t("head.page.pool")}>
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <Grid container spacing={2}>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.ClickAble to={details.epoch(data?.epochNo)} data-testid="delegationOverview.epochCard">
            <StyledCard.Content>
              <StyledCard.Title data-testid="delegationOverview.epochTitle">{t("glossary.epoch")}</StyledCard.Title>
              <StyledCard.NumberEpoch data-testid="delegationOverview.epochValue">
                {data?.epochNo}
              </StyledCard.NumberEpoch>
              <Box
                component="span"
                data-testid="delegationOverview.endIn"
                sx={{ color: (theme) => theme.palette.secondary.light, textAlign: "left" }}
              >
                {t("common.endIn")}:{" "}
                <StyledCard.Comment>
                  {`${days} ${days > 1 ? t("common.days") : t("common.day")} `}
                  {`${hours} ${hours > 1 ? t("common.hours") : t("common.hour")} `}
                  {`${minutes} ${minutes > 1 ? t("common.minutes") : t("common.minute")} `}
                  {`${seconds} ${seconds > 1 ? t("common.seconds") : t("common.second")}`}
                </StyledCard.Comment>
              </Box>
            </StyledCard.Content>
            <StyledImg src={theme.mode === "light" ? CurentEpochPool : CurentEpochPoolDark} alt="Clock" />
          </StyledCard.ClickAble>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <Box height={"100%"}>
            <Box
              bgcolor={(theme) => theme.palette.secondary[0]}
              boxShadow={(theme) => theme.shadow.card}
              borderRadius="12px"
              height={"100%"}
            >
              <StyledCard.ClickAble to={details.epoch(data?.epochNo)}>
                <StyledCard.Content>
                  <StyledCard.Title data-testid="delegationOverview.slotTitle">{t("glossary.slot")}</StyledCard.Title>
                  <StyledCard.Value data-testid="delegationOverview.slotValue">
                    {moment.utc(currentEpoch?.endTime, DATE_FORMAT).isAfter(moment().utc())
                      ? (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH
                      : MAX_SLOT_EPOCH}
                    <Box component="span" sx={{ color: (theme) => theme.palette.secondary.light, fontWeight: "400" }}>
                      / {MAX_SLOT_EPOCH}
                    </Box>
                  </StyledCard.Value>
                </StyledCard.Content>
                <StyledImg src={theme.mode === "light" ? RocketPoolIcon : RocketPoolDarkIcon} alt="Rocket" />
              </StyledCard.ClickAble>
              <Box position={"relative"} top={-60} px={4}>
                <StyledLinearProgress
                  variant="determinate"
                  value={
                    moment.utc(currentEpoch?.endTime, DATE_FORMAT).isAfter(moment().utc())
                      ? (((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH) / MAX_SLOT_EPOCH) * 100
                      : 100
                  }
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.Container
            sx={{
              justifyContent: "space-between",
              [theme.breakpoints.down(350)]: {
                display: "block"
              }
            }}
          >
            <StyledCard.Content style={{ padding: "30px 0 0 30px" }}>
              <StyledCard.Title data-testid="delegationOverview.liveStakeTitle">
                {t("glossary.liveStake")} (<ADAicon />)
              </StyledCard.Title>
              <CustomTooltip
                data-testid="delegationOverview.liveStakeValue"
                title={data?.liveStake ? formatADAFull(data?.liveStake) : t("common.N/A")}
              >
                <StyledCard.Value>{data?.liveStake ? formatADA(data?.liveStake) : t("common.N/A")}</StyledCard.Value>
              </CustomTooltip>
            </StyledCard.Content>
            <StyledCard.Content>
              <StyledCard.Title data-testid="delegationOverview.delegatorsTitle">
                {t("glossary.delegators")}
              </StyledCard.Title>
              <StyledCard.Value data-testid="delegationOverview.delegatorsValue">
                {numberWithCommas(data?.delegators)}
              </StyledCard.Value>
            </StyledCard.Content>
            <Box>
              <StyledImg src={theme.mode === "light" ? LiveStakeIcon : LiveStakeDarkIcon} alt="Rocket" />
            </Box>
          </StyledCard.Container>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.Container>
            <StyledCard.Content>
              <StyledCard.Title data-testid="delegationOverview.totalPoolsTitle">
                {t("glossary.totalPools")}
              </StyledCard.Title>
              <StyledCard.Value data-testid="delegationOverview.totalPoolsValue">
                {(data?.activePools ? +data.activePools : 0) + (data?.retiredPools ? +data.retiredPools : 0)}
              </StyledCard.Value>
              <Box
                component="span"
                sx={{ color: (theme) => theme.palette.secondary.light, textAlign: "left" }}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <Box flex={1}>
                  <PoolTitle data-testid="delegationOverview.activePoolsTitle">{t("glossary.activePools")}</PoolTitle>
                  <PoolValue data-testid="delegationOverview.activePoolsValue">{data?.activePools || 0}</PoolValue>
                </Box>
                <Box flex={1}>
                  <PoolTitle data-testid="delegationOverview.retiredPoolsTitle">{t("glossary.retiredPools")}</PoolTitle>
                  <PoolValue data-testid="delegationOverview.retiredPoolsValue">{data?.retiredPools || 0}</PoolValue>
                </Box>
              </Box>
            </StyledCard.Content>
            <StyledCustomIcon
              icon={theme.mode === "light" ? TotalPoolIcon : TotalPoolDarkIcon}
              originWidth={35}
              originHeight={35}
              width={35}
            />
          </StyledCard.Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OverViews;
