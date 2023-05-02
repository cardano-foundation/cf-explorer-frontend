import React from "react";
import TransactionChart from "./TransactionChart";
import ComingSoon from "./ComingSoon";
import { Grid } from "@mui/material";

interface Props {}

const HomeTrending: React.FC<Props> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={8} md={8} xs={12}>
        <TransactionChart />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <ComingSoon />
      </Grid>
    </Grid>
  );
};

export default HomeTrending;
