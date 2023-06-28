import React from "react";
import { Grid } from "@mui/material";

import TransactionChart from "./TransactionChart";

const HomeTrending = () => {
  return (
    <Grid container spacing={2} data-testid="home-trending">
      <Grid item xs={12}>
        <TransactionChart />
      </Grid>
    </Grid>
  );
};

export default HomeTrending;
