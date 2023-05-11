import React from "react";
import TransactionChart from "./TransactionChart";
import { Grid } from "@mui/material";

interface Props {}

const HomeTrending: React.FC<Props> = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TransactionChart />
      </Grid>
    </Grid>
  );
};

export default HomeTrending;
