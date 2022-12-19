import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";

import { CurentEpochIcon, LiveStakeIcon, RocketBackground } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatADA, numberWithCommas } from "../../../commons/utils/helper";

import { StyledCard, StyledImg, StyledLinearProgress, StyledSkeleton } from "./styles";

interface OverViewProps {
  data: OverViewDelegation | null;
  loading: boolean;
}

const OverViews: React.FC<OverViewProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <StyledSkeleton variant="rectangular" />
        </Grid>
      </Grid>
    );
  }

  const duration = moment.duration(data?.countDownEndTime || 0, "seconds");

  return (
    <Grid container spacing={2}>
      <Grid item xl={4} md={6} xs={12}>
        <StyledCard.Container>
          <StyledCard.Content>
            <StyledCard.Title>Epoch</StyledCard.Title>
            <StyledCard.Link to={routers.EPOCH_DETAIL.replace(":epochId", "" + data?.epochNo || "")}>
              {data?.epochNo}
            </StyledCard.Link>
            <span style={{ color: "#667085" }}>
              End in:{" "}
              <StyledCard.Comment>
                {duration.days()} day {duration.hours()} hours {duration.minutes()} minutes
              </StyledCard.Comment>
            </span>
          </StyledCard.Content>
          <StyledImg src={CurentEpochIcon} alt="Clock" />
        </StyledCard.Container>
      </Grid>
      <Grid item xl={4} md={6} xs={12}>
        <StyledCard.Container>
          <StyledCard.Content>
            <StyledCard.Title>Slot</StyledCard.Title>
            <StyledCard.Value>
              {data?.epochSlotNo}
              <span style={{ color: "#98A2B3", fontWeight: "400" }}> / {MAX_SLOT_EPOCH}</span>
            </StyledCard.Value>
            <StyledLinearProgress variant="determinate" value={((data?.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100} />
          </StyledCard.Content>
          <StyledImg src={RocketBackground} alt="Rocket" />
        </StyledCard.Container>
      </Grid>
      <Grid item xl={4} md={6} xs={12}>
        <StyledCard.Container>
          <StyledCard.Content>
            <StyledCard.Title>Live Stake</StyledCard.Title>
            <StyledCard.Value>{formatADA(data?.liveStake)}</StyledCard.Value>
          </StyledCard.Content>
          <StyledCard.Content>
            <StyledCard.Title>Delegators</StyledCard.Title>
            <StyledCard.Value>{numberWithCommas(data?.delegators || 0)}</StyledCard.Value>
          </StyledCard.Content>
          <StyledImg src={LiveStakeIcon} alt="Rocket" />
        </StyledCard.Container>
      </Grid>
    </Grid>
  );
};

export default OverViews;
