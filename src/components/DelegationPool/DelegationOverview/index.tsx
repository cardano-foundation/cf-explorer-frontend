import React from "react";
import { Box, Grid } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

import { CurentEpochPool, LiveStakePoolIcon, RocketPoolIcon, TotalPoolIcon } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { MAX_SLOT_EPOCH, REFRESH_TIMES } from "src/commons/utils/constants";
import { formatADA, formatADAFull, numberWithCommas } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import Card from "src/components/commons/Card";
import FormNowMessage from "src/components/commons/FormNowMessage";
import CustomTooltip from "src/components/commons/CustomTooltip";

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
  const { data, loading, lastUpdated } = useFetch<OverViewDelegation>(
    API.DELEGATION.HEADER,
    undefined,
    false,
    REFRESH_TIMES.POOLS
  );
  const { currentEpoch } = useSelector(({ system }: RootState) => system);

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
  const slot = (currentEpoch?.slot || 0) % MAX_SLOT_EPOCH;
  const countdown = MAX_SLOT_EPOCH - slot;
  const duration = moment.duration(countdown ? countdown : 0, "second");
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return (
    <Card title="Stake Pool">
      <TimeDuration>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <Grid container spacing={2}>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.Container>
            <StyledCard.Content>
              <StyledCard.Title>Epoch</StyledCard.Title>
              <StyledCard.Link to={details.epoch(data?.epochNo)}>{data?.epochNo}</StyledCard.Link>
              <Box component="span" sx={{ color: (theme) => theme.palette.grey[300], textAlign: "left" }}>
                End in:{" "}
                <StyledCard.Comment>
                  {`${days} day${days > 1 ? "s" : ""} `}
                  {`${hours} hour${hours > 1 ? "s" : ""} `}
                  {`${minutes} minute${minutes > 1 ? "s" : ""} `}
                  {`${seconds} second${seconds > 1 ? "s" : ""}`}
                </StyledCard.Comment>
              </Box>
            </StyledCard.Content>
            <StyledImg src={CurentEpochPool} alt="Clock" />
          </StyledCard.Container>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <Box height={"100%"}>
            <Box
              bgcolor={(theme) => theme.palette.common.white}
              boxShadow={(theme) => theme.shadow.card}
              borderRadius="12px"
              height={"100%"}
            >
              <StyledCard.Container style={{ boxShadow: "none" }}>
                <StyledCard.Content>
                  <StyledCard.Title>Slot</StyledCard.Title>
                  <StyledCard.Value>
                    {(currentEpoch?.slot || 0) % MAX_SLOT_EPOCH}
                    <Box component="span" sx={{ color: (theme) => theme.palette.text.hint, fontWeight: "400" }}>
                      / {MAX_SLOT_EPOCH}
                    </Box>
                  </StyledCard.Value>
                </StyledCard.Content>
                <StyledImg src={RocketPoolIcon} alt="Rocket" />
              </StyledCard.Container>
              <Box position={"relative"} top={-60} px={4}>
                <StyledLinearProgress
                  variant="determinate"
                  value={(((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH) / MAX_SLOT_EPOCH) * 100}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.Container sx={{ justifyContent: "space-between" }}>
            <StyledCard.Content style={{ padding: "30px 0 0 30px" }}>
              <StyledCard.Title>Live Stake</StyledCard.Title>
              <CustomTooltip title={formatADAFull(data?.liveStake)}>
                <StyledCard.Value>{formatADA(data?.liveStake)}</StyledCard.Value>
              </CustomTooltip>
            </StyledCard.Content>
            <StyledCard.Content style={{}}>
              <StyledCard.Title>Delegators</StyledCard.Title>
              <StyledCard.Value>{numberWithCommas(data?.delegators)}</StyledCard.Value>
            </StyledCard.Content>
            <Box>
              <StyledImg src={LiveStakePoolIcon} alt="Rocket" />
            </Box>
          </StyledCard.Container>
        </Grid>
        <Grid item xl={3} md={6} xs={12}>
          <StyledCard.Container>
            <StyledCard.Content>
              <StyledCard.Title>Total Pools</StyledCard.Title>
              <StyledCard.Value>
                {(data?.activePools ? +data.activePools : 0) + (data?.retiredPools ? +data.retiredPools : 0)}
              </StyledCard.Value>
              <Box
                component="span"
                sx={{ color: (theme) => theme.palette.grey[300], textAlign: "left" }}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
              >
                <Box flex={1}>
                  <PoolTitle>Active Pools</PoolTitle>
                  <PoolValue>{data?.activePools || 0}</PoolValue>
                </Box>
                <Box flex={1}>
                  <PoolTitle>Retired Pools</PoolTitle>
                  <PoolValue>{data?.retiredPools || 0}</PoolValue>
                </Box>
              </Box>
            </StyledCard.Content>
            <StyledCustomIcon icon={TotalPoolIcon} originWidth={35} originHeight={35} width={35} />
          </StyledCard.Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OverViews;
