import { Box, Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { CurentEpochIcon, LiveStakeIcon, RocketBackground } from "~/commons/resources";
import { StyledCard, StyledImg, StyledLinearProgress, StyledSkeleton } from "./styles";
import { details } from "~/commons/routers";
import { API } from "~/commons/utils/api";
import { MAX_SLOT_EPOCH, REFRESH_TIMES } from "~/commons/utils/constants";
import { formatADA, numberWithCommas } from "~/commons/utils/helper";
import useFetch from "~/commons/hooks/useFetch";
import { useScreen } from "~/commons/hooks/useScreen";

const OverViews: React.FC = () => {
  const { data, loading } = useFetch<OverViewDelegation>(API.DELEGATION.HEADER, undefined, false, REFRESH_TIMES.POOLS);
  const { isGalaxyFoldSmall } = useScreen();

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

  const duration = moment.duration(data?.countDownEndTime || 0, "millisecond");
  return (
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
                  {data?.epochSlotNo}
                  <Box component='span' sx={{ color: (theme) => theme.palette.text.hint, fontWeight: "400" }}>
                    / {MAX_SLOT_EPOCH}
                  </Box>
                </StyledCard.Value>
              </StyledCard.Content>
              <StyledImg src={RocketBackground} alt='Rocket' />
            </StyledCard.Container>
            <Box position={"relative"} top={-30} px={4}>
              <StyledLinearProgress variant='determinate' value={((data?.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xl={4} md={6} xs={12}>
        <StyledCard.Container>
          <StyledCard.Content style={{ flex: 1, paddingTop: isGalaxyFoldSmall ? "50px" : "30px" }}>
            <StyledCard.Title>Live Stake</StyledCard.Title>
            <StyledCard.Value>{formatADA(data?.liveStake)}</StyledCard.Value>
          </StyledCard.Content>
          <StyledCard.Content style={{ flex: 1, paddingTop: isGalaxyFoldSmall ? "50px" : "30px" }}>
            <StyledCard.Title>Delegators</StyledCard.Title>
            <StyledCard.Value>{numberWithCommas(data?.delegators)}</StyledCard.Value>
          </StyledCard.Content>
          <Box flex={"1"}>
            <StyledImg src={LiveStakeIcon} alt='Rocket' />
          </Box>
        </StyledCard.Container>
      </Grid>
    </Grid>
  );
};

export default OverViews;
