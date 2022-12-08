import React from "react";
import { Grid } from "@mui/material";
import styles from "./index.module.scss";
import TransactionChart from "./TransactionChart";
import ComingSoon from "./ComingSoon";

interface Props {}

const HomeTrending: React.FC<Props> = () => {
  return (
    <Grid className={styles.trending} spacing={2} container columns={30}>
      <Grid item xs={30} lg={18} style={{ height: "100%" }}>
        <TransactionChart />
      </Grid>
      <Grid item xs={30} lg={12} style={{ height: "100%" }}>
        <ComingSoon />
      </Grid>
    </Grid>
  );
};

export default HomeTrending;
