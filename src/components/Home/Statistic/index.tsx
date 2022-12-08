import { Skeleton } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../commons/hooks/useFetch";
import {
  AdaPriceIcon,
  CurentEpochIcon,
  LiveStakeIcon,
  MarketCapIcon,
  TotalADAStakeIcon,
} from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import { MAX_SLOT_EPOCH } from "../../../commons/utils/constants";
import { formatCurrency } from "../../../commons/utils/helper";
import styles from "./index.module.scss";

interface Props {}

// const SkeletonBox = () => (
//   <div className={styles.box}>
//     <div className={styles.content}>
//       <Skeleton variant="rectangular" />
//       <Skeleton variant="rectangular" className={styles.skeleton} />
//       <Skeleton variant="rectangular" className={styles.skeleton} />
//     </div>
//   </div>
// );

const HomeStatistic: React.FC<Props> = () => {
  const { data: currentEpoch, loading: loadingEpoch } = useFetch<EpochCurrentType>(`epoch/current`);
  // const adaPrice = 1;
  return (
    <>
      <Grid container columns={30} spacing={2} className={styles.statistic}>
        <Grid item xs={30} sm={15} md={10} xl={6}>
          <div className={styles.box}>
            <img className={styles.icon} src={AdaPriceIcon} alt="Ada Price" />
            <div className={styles.content}>
              <h4>Ada Price</h4>
              {/* {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />} */}
              <h3>TBA</h3>
              {/*{!loadingEpoch && <div className={styles.adaPrice}>
                    <small className={styles.priceValue}>TBA</small>
                    <span className={styles.priceRate}>
                      <img src={adaPrice > 0 ? UpGreenIcon : DownRedIcon} alt="price rate" />
                      <small className={adaPrice > 0 ? styles.priceUp : styles.priceDown}>TBA</small>
                    </span>
                  </div>} */}
            </div>
          </div>
        </Grid>
        <Grid item xs={30} sm={15} md={10} xl={6}>
          <div className={styles.box}>
            <img className={styles.icon} src={MarketCapIcon} alt="Market cap" />
            <div className={styles.content}>
              <h4>Market cap</h4>
              <h3>TBA</h3>
              {/* {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />} */}
            </div>
          </div>
        </Grid>
        <Grid item xs={30} sm={15} md={10} xl={6}>
          <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${currentEpoch?.no}`)} className={styles.box}>
            <img className={styles.icon} src={CurentEpochIcon} alt="Curent Epoch" />
            <div className={styles.content}>
              <h4>Curent Epoch</h4>
              <small>
                {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />}
                {!loadingEpoch && (
                  <>
                    Epoch: <small className={styles.epochValue}>{formatCurrency(currentEpoch?.no || 0)}</small>
                  </>
                )}
                <br />
                {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />}
                {!loadingEpoch && (
                  <>
                    Slot:{" "}
                    <small className={styles.epochValue}>
                      {formatCurrency((currentEpoch?.slot || 0) % MAX_SLOT_EPOCH)}
                    </small>
                    /{formatCurrency(MAX_SLOT_EPOCH)}{" "}
                  </>
                )}
              </small>
            </div>
          </Link>
        </Grid>
        <Grid item xs={30} sm={15} md={10} xl={6}>
          <div className={styles.box}>
            <img className={styles.icon} src={LiveStakeIcon} alt="Total ADA Stake" />
            <div className={styles.content}>
              <h4>Live Stake</h4>
              <h3>TBA</h3>
              {/* {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />} */}

              {/* <div className={styles.progress}>
                    <div className={styles.progressActive} style={{ width: "70%" }}>
                      {"70%"}
                    </div>
                    <div className={styles.progressPending} style={{ width: "30%" }}>
                      {"30%"}
                    </div>
                  </div>
                  <small>
                    Active Stake: <small className={styles.progressRate}>{formatPrice(25.09 * 10 ** 9)} </small> (0.7%)
                    <br />
                    Circulating supply: <small className={styles.progressRate}>
                      {formatPrice(35.12 * 10 ** 9)}
                    </small>{" "}
                    (78%)
                  </small> */}
            </div>
          </div>
        </Grid>
        <Grid item xs={30} sm={15} md={10} xl={6}>
          <div className={styles.box}>
            <img className={styles.icon} src={TotalADAStakeIcon} alt="Total ADA Stake" />
            <div className={styles.content}>
              <h4>Total ADA Stake</h4>
              <h3>TBA</h3>
              {/* {loadingEpoch && <Skeleton variant="rectangular" height={25} className={styles.skeleton} />} */}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeStatistic;
