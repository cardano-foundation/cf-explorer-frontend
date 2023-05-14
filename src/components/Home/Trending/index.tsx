import React from 'react';
import TransactionChart from './TransactionChart';
import { Grid } from '@mui/material';

const HomeTrending = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TransactionChart />
      </Grid>
      {/* <Grid item lg={4} md={4} xs={12}>
        <ComingSoon />
      </Grid> */}
    </Grid>
  );
};

export default HomeTrending;
