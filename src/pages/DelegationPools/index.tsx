import { useState } from "react";
import { Grid, LinearProgress, Skeleton, styled } from "@mui/material";

import Card from "../../components/commons/Card";
import useFetchList from "../../commons/hooks/useFetchList";
import { formatADA, numberWithCommas } from "../../commons/utils/helper";
import DelegationLists from "../../components/DelegationLists";

import styles from "./index.module.scss";
import rocketImg from "../../commons/resources/images/rocket.png";
import moneyImg from "../../commons/resources/images/money.png";
import searchImg from "../../commons/resources/images/search.png";
import useFetch from "../../commons/hooks/useFetch";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "qs";
import moment from "moment";
import { MAX_SLOT_EPOCH } from "../../commons/utils/constants";
import ProgressCircle from "../../components/commons/ProgressCircle";

const Delegations = () => {
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [searchPools, setSearchPools] = useState(query.searchPools ? (query.searchPools as string) : "");

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data: overviews, loading: overviewsLoading } = useFetch<OverViewDelegation>("/delegation/header");
  const {
    data: delegationLists,
    total,
    loading,
    initialized,
  } = useFetchList<Delegators>("/delegation/pool-list", {
    page: query.page ? +query.page : 1,
    size: query.size ? (query.size as string) : 10,
    search: query.searchPools ? (query.searchPools as string) : "",
  });

  return (
    <div className={styles.container}>
      <Card title="Delegation Pools Explorer" className={styles.wrapper}>
        <OverViews data={overviews} loading={overviewsLoading} />
      </Card>
      <div className={styles.search}>
        <div className={styles.group}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="Search Pools"
              onChange={e => setSearchPools(e.target.value)}
              value={searchPools || ""}
              onKeyUp={e => {
                if (e.key === "Enter") {
                  setQuery({ searchPools, page: 1, size: 10 });
                }
              }}
            />
            <img src={searchImg} alt="search icon" />
          </div>
          {/* <button
            className={styles.button}
            onClick={() => {
              setQuery({ searchPools, page: 1, size: 10 });
            }}
          >
            Search
          </button> */}
        </div>
      </div>
      <DelegationLists data={delegationLists} total={total} loading={loading} initialized={initialized} />
    </div>
  );
};

export default Delegations;

interface OverViewProps {
  data: OverViewDelegation | null;
  loading: boolean;
}

const OverViews: React.FC<OverViewProps> = ({ data, loading }) => {
  var duration = moment.duration(data?.countDownEndTime || 0, "seconds");

  if (loading) {
    return (
      <Grid container spacing={2}>
        <Grid item xl={4} md={6} xs={12}>
          <Skeleton variant="rectangular" className={styles.sekeletion} />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <Skeleton variant="rectangular" className={styles.sekeletion} />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <Skeleton variant="rectangular" className={styles.sekeletion} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xl={4} md={6} xs={12}>
        <div className={styles.card}>
          <div>
            <div className={styles.title}>Epoch</div>
            <div className={styles.subtitle}>
              End in:{" "}
              <span className={styles.value}>
                {duration.days()} day {duration.hours()} hours {duration.minutes()} minutes
              </span>
            </div>
          </div>
          <ProgressCircle percent={((data?.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100} width={96}>
            <div className={styles.epochTitle}>{data?.epochNo || 0} </div>
          </ProgressCircle>
        </div>
      </Grid>
      <Grid item xl={4} md={6} xs={12}>
        <div className={styles.card}>
          <div style={{ width: "80%" }}>
            <div className={styles.title}>Slot</div>
            <div className={styles.subtitle}>
              <span className={styles.value}>{data?.epochSlotNo || 0} / </span>
              {MAX_SLOT_EPOCH}
            </div>
            <StyledLinearProgress variant="determinate" value={((data?.epochSlotNo || 0) / MAX_SLOT_EPOCH) * 100} />
          </div>
          <div>
            <img src={rocketImg} alt="rocket icon" />
          </div>
        </div>
      </Grid>
      <Grid item xl={4} md={6} xs={12}>
        <div className={styles.card}>
          <div>
            <div className={styles.title}>
              Live Stake: <span className={styles.value}>{formatADA(data?.liveStake)}</span>
            </div>
            <div className={styles.title}>
              Delegators: <span className={styles.value}> {numberWithCommas(data?.delegators || 0)}</span>
            </div>
          </div>
          <div>
            <img src={moneyImg} alt="money icon" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const StyledLinearProgress = styled(LinearProgress)`
  margin-top: 10px;
  width: 100%;
  height: 10px;
  border-radius: 34px;
  background: rgba(0, 0, 0, 0.1);

  & > .MuiLinearProgress-barColorPrimary {
    border-radius: 34px;
    background: ${props => props.theme.linearGradientGreen};
  }
`;
