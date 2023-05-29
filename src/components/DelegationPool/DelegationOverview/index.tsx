import { Box, Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { CurentEpochIcon, LiveStakeIcon, RocketBackground } from "~/commons/resources";
import { StyledCard, StyledImg, StyledLinearProgress, StyledSkeleton, TimeDuration } from "./styles";
import { details } from "~/commons/routers";
import { API } from "~/commons/utils/api";
import { MAX_SLOT_EPOCH, REFRESH_TIMES } from "~/commons/utils/constants";
import { formatADA, formatADAFull, numberWithCommas } from "~/commons/utils/helper";
import useFetch from "~/commons/hooks/useFetch";
import { useScreen } from "~/commons/hooks/useScreen";
import { useSelector } from "react-redux";
import Card from "~/components/commons/Card";
import FormNowMessage from "~/components/commons/FormNowMessage";
import CustomTooltip from "~/components/commons/CustomTooltip";

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
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant='rectangular' />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant='rectangular' />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant='rectangular' />
        </Grid>
      </Grid>
    );
  }
  const now = moment();
  const duration = moment.duration(
    data?.countDownEndTime ? data.countDownEndTime + now.utcOffset() * 60 * 1000 : 0,
    "millisecond"
  );
  return (
    <Card
      title='Delegation Pools Explorer'
      extra={
        <TimeDuration>
          <FormNowMessage time={lastUpdated} />
        </TimeDuration>
      }
    >
      <TimeDuration mobile={1}>
        <FormNowMessage time={lastUpdated} />
      </TimeDuration>
      <Grid container spacing={2}>
        <Grid item xl={4} md={6} xs={12}>
          <StyledCard.Container>
            <StyledCard.Content>
              <StyledCard.Title>Epoch</StyledCard.Title>
              <StyledCard.Link to={details.epoch(data?.epochNo)}>{data?.epochNo}</StyledCard.Link>
              <Box component='span' sx={{ color: (theme) => theme.palette.grey[400], textAlign: "left" }}>
                End in:{" "}
                <StyledCard.Comment>
                  {duration.days()} day {duration.hours()} hours {duration.minutes()} minutes
                </StyledCard.Comment>
              </Box>
            </StyledCard.Content>
            <StyledImg src={CurentEpochIcon} alt='Clock' />
          </StyledCard.Container>
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <Box>
            <Box
              bgcolor={(theme) => theme.palette.common.white}
              boxShadow={(theme) => theme.shadow.card}
              borderRadius='12px'
            >
              <StyledCard.Container style={{ boxShadow: "none" }}>
                <StyledCard.Content>
                  <StyledCard.Title>Slot</StyledCard.Title>
                  <StyledCard.Value>
                    {currentEpoch?.slot}
                    <Box component='span' sx={{ color: (theme) => theme.palette.text.hint, fontWeight: "400" }}>
                      / {MAX_SLOT_EPOCH}
                    </Box>
                  </StyledCard.Value>
                </StyledCard.Content>
                <StyledImg src={RocketBackground} alt='Rocket' />
              </StyledCard.Container>
              <Box position={"relative"} top={-30} px={4}>
                <StyledLinearProgress
                  variant='determinate'
                  value={((currentEpoch?.slot || 0) / MAX_SLOT_EPOCH) * 100}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
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
              <StyledImg src={LiveStakeIcon} alt='Rocket' />
            </Box>
          </StyledCard.Container>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OverViews;
