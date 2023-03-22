import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

import { formatADAFull, formatPercent, numberWithCommas } from "../../../commons/utils/helper";

import { Item, StyledContainer, Title, Value } from "./styles";

interface IDelegationDetailOverview {
  data: DelegationOverview | null;
  loading: boolean;
}

const DelegationDetailOverview: React.FC<IDelegationDetailOverview> = ({ data, loading }) => {
  const overviewData = {
    Reward: `${data?.reward || 0}%`,
    Fee: formatPercent(data?.margin),
    ROS: formatPercent(data?.ros),
    "Pledge(A)": formatADAFull(data?.pledge),
    "Cost(A)": formatADAFull(data?.cost),
    "Epoch Block": data?.epochBlock || 0,
    "Lifetime Block": numberWithCommas(data?.lifetimeBlock),
  };

  if (loading) {
    return (
      <StyledContainer>
        <Grid container columns={24} spacing={2}>
          {Object.keys(overviewData).map((i, ii) => {
            return (
              <Grid item xs={24} sm={12} md={8} key={ii} xl={6}>
                <Box borderRadius={10} overflow="hidden">
                  <Skeleton variant="rectangular" height={115} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </StyledContainer>
    );
  }
  return (
    <StyledContainer>
      <Grid container columns={60} spacing={2}>
        {Object.keys(overviewData).map((i, ii) => {
          return (
            <Grid item xs={30} sm={20} md={15} xl={12} key={ii}>
              <Item>
                <Title>{i}</Title>
                <Value sx={{ color: theme => (i === "Reward" ? theme.palette.primary.main : "initial") }}>
                  {overviewData[i as keyof typeof overviewData]}
                </Value>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </StyledContainer>
  );
};

export default DelegationDetailOverview;
