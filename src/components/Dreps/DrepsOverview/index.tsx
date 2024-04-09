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
import { MAX_SLOT_EPOCH } from "src/commons/utils/constants";
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

const DrepsOverview: React.FC = () => {
  const { t } = useTranslation();
  const { currentEpoch, blockNo } = useSelector(({ system }: RootState) => system);
  const theme = useTheme();
  const { data, loading, lastUpdated } = useFetch<OverViewDreps>(
    API.DREPS_LIST.DREPS_OVERVIEW,
    undefined,
    false,
    blockNo
  );

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

  const slot = moment(`${currentEpoch?.endTime} GMT+0000`).isAfter(moment().utc())
    ? (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH
    : MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;
  const duration = moment.duration(countdown ? countdown : 0, "second");
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return (
    <Card
      title={
        <>
          <Box>{t("head.page.dreps")}</Box>
          <Box fontSize={14} color={theme.palette.secondary.light} fontWeight={400} mt={1}>
            {t("head.page.dreps.des")}
          </Box>
        </>
      }
    >
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} sm={6}>
              <StyledCard.ClickAble to={details.epoch(data?.epochNo)}>
                <StyledCard.Content>
                  <StyledCard.Title>{t("glossary.epoch")}</StyledCard.Title>
                  <StyledCard.Link to={details.epoch(data?.epochNo)}>{data?.epochNo}</StyledCard.Link>
                  <Box component="span" sx={{ color: (theme) => theme.palette.secondary.light, textAlign: "left" }}>
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
            <Grid item md={6} xs={12} sm={6}>
              <Box height={"100%"}>
                <Box
                  bgcolor={(theme) => theme.palette.secondary[0]}
                  boxShadow={(theme) => theme.shadow.card}
                  borderRadius="12px"
                  height={"100%"}
                >
                  <StyledCard.ClickAble to={details.epoch(data?.epochNo)}>
                    <StyledCard.Content>
                      <StyledCard.Title>{t("glossary.slot")}</StyledCard.Title>
                      <StyledCard.Value>
                        {moment(`${currentEpoch?.endTime} GMT+0000`).isAfter(moment().utc())
                          ? (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH
                          : MAX_SLOT_EPOCH}
                        <Box
                          component="span"
                          sx={{ color: (theme) => theme.palette.secondary.light, fontWeight: "400" }}
                        >
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
                        moment(`${currentEpoch?.endTime} GMT+0000`).isAfter(moment().utc())
                          ? (((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH) / MAX_SLOT_EPOCH) * 100
                          : 100
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={6}>
              <StyledCard.Container
                sx={{
                  justifyContent: "space-between",
                  [theme.breakpoints.between(1200, 1600)]: { flexWrap: "wrap" }
                }}
              >
                <StyledCard.Content style={{ padding: "30px 0 0 30px" }}>
                  <StyledCard.Title>
                    {t("glossary.activeStake")} (<ADAicon />)
                  </StyledCard.Title>
                  <CustomTooltip title={data?.liveStake ? formatADAFull(data?.liveStake) : t("common.N/A")}>
                    <StyledCard.Value>
                      {data?.liveStake ? formatADA(data?.activeStake) : t("common.N/A")}
                    </StyledCard.Value>
                  </CustomTooltip>
                </StyledCard.Content>
                <StyledCard.Content style={{}}>
                  <StyledCard.Title>{t("glossary.delegators")}</StyledCard.Title>
                  <StyledCard.Value>{numberWithCommas(data?.delegators)}</StyledCard.Value>
                </StyledCard.Content>
                <Box>
                  <StyledImg src={theme.mode === "light" ? LiveStakeIcon : LiveStakeDarkIcon} alt="Rocket" />
                </Box>
              </StyledCard.Container>
            </Grid>
            <Grid item md={6} xs={12} sm={6}>
              <StyledCard.Container>
                <StyledCard.Content>
                  <StyledCard.Title>{t("glossary.totalDreps")}</StyledCard.Title>
                  <StyledCard.Value>{data?.totalDReps || 0}</StyledCard.Value>
                  <Box
                    component="span"
                    sx={{ color: (theme) => theme.palette.secondary.light, textAlign: "left" }}
                    display={"flex"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Box flex={1}>
                      <PoolTitle>{t("glossary.activeDReps")}</PoolTitle>
                      <PoolValue>{data?.activeDReps || 0}</PoolValue>
                    </Box>
                    <Box flex={1}>
                      <PoolTitle>{t("glossary.inactiveDReps")}</PoolTitle>
                      <PoolValue>{data?.inactiveDReps || 0}</PoolValue>
                    </Box>
                    <Box flex={1}>
                      <PoolTitle>{t("glossary.retiredDReps")}</PoolTitle>
                      <PoolValue>{data?.retiredDReps || 0}</PoolValue>
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
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <StyledCard.Container>
            <StyledCard.Content>Chart</StyledCard.Content>
          </StyledCard.Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DrepsOverview;
