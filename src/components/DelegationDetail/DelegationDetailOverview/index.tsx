import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

import { formatADAFull, formatPercent, numberWithCommas, toFixedBigNumber } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { Item, StyledContainer, Title, Value } from "./styles";

interface IDelegationDetailOverview {
  data: DelegationOverview | null;
  loading: boolean;
}

const DelegationDetailOverview: React.FC<IDelegationDetailOverview> = ({ data, loading }) => {
  const overviewData = [
    {
      title: "Reward",
      value: `${toFixedBigNumber(data?.reward || 0, 2)}%`,
      tooltip: "Last calculated gross return, as of the second last epoch"
    },
    {
      title: "ROS",
      value: formatPercent(data?.ros ? data?.ros / 100 : 0),
      tooltip: "Gross average return during pool’s lifetime"
    },
    {
      title: "Fixed Cost(A)",
      value: formatADAFull(data?.cost),
      tooltip: ""
    },
    {
      title: "Margin",
      value: formatPercent(data?.margin),
      tooltip: ""
    },

    {
      title: "Declared Pledge(A)",
      value: formatADAFull(data?.pledge),
      tooltip: ""
    },
    {
      title: "Epoch Blocks",
      value: data?.epochBlock || 0,
      tooltip: ""
    },
    {
      title: "Lifetime Blocks",
      value: numberWithCommas(data?.lifetimeBlock),
      tooltip: ""
    }
  ];

  if (loading) {
    return (
      <StyledContainer>
        <Grid container columns={24} spacing={2}>
          {overviewData.map((i, ii) => {
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
        {overviewData.map((item, ii) => {
          return (
            <Grid item xs={30} sm={20} md={15} xl={12} key={ii}>
              <Item>
                <CustomTooltip title={item.tooltip}>
                  <Title>{item.title}</Title>
                </CustomTooltip>
                <Value
                  sx={{
                    color: (theme) =>
                      item.title === "Reward" ? theme.palette.primary.main : theme.palette.secondary.main
                  }}
                >
                  {item.value}
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
