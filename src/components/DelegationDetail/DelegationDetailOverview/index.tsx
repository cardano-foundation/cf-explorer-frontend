import { Grid, Skeleton } from "@mui/material";
import React from "react";

import { formatADA, formatPercent, numberWithCommas } from "../../../commons/utils/helper";

import { Item, StyledContainer, Title, Value } from "./styles";

interface IDelegationDetailOverview {
  data: DelegationOverview | null;
  loading: boolean;
}

const DelegationDetailOverview: React.FC<IDelegationDetailOverview> = ({ data, loading }) => {
  const overviewData = {
    Reward: data?.reward ? `${data.reward}%` : "0%",
    Fee: data?.margin ? formatPercent(data.margin) : "0%",
    ROS: data?.ros ? formatPercent(data.ros) : "0%",
    "Pledge(A)": formatADA(data?.pledge) || 0,
    "Cost(A)": formatADA(data?.cost) || 0,
    "Epoch Block": data?.epochBlock || 0,
    "Lifetime Block": numberWithCommas(data?.lifetimeBlock || 0),
  };

  if (loading) {
    return (
      <StyledContainer>
        <Grid container columns={24} spacing={2}>
          {Object.keys(overviewData).map((i, ii) => {
            return (
              <Grid item xs={24} sm={12} md={8} key={ii} xl={6}>
                <Skeleton variant="rectangular" />
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
                <Value style={{ color: `${i === "Reward" && "#438F68"}` }}>
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
