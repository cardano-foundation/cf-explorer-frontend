import { useState, useRef } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Grid, Skeleton, styled, Tooltip } from "@mui/material";
import { parse, stringify } from "qs";

import { DelegationEpochList, DelegationStakingDelegatorsList } from "../../components/DelegationDetailList";
import DelegationDetailChart from "../../components/DelegationDetailChart";
import DetailCard from "../../components/commons/DetailCard";

import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import { formatADA, getShortWallet, numberWithCommas } from "../../commons/utils/helper";

import styles from "./index.module.scss";

import "./select.css";
import useFetchList from "../../commons/hooks/useFetchList";
import CopyButton from "../../components/commons/CopyButton";
import { AIcon } from "../../commons/resources";

const DelegationDetail = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const { search } = useLocation();
  const history = useHistory();
  const query = parse(search.split("?")[1]);
  const [tab, setTab] = useState<"epochs" | "delegators">("epochs");
  const tableRef = useRef(null);

  const scrollEffect = () => {
    tableRef !== null &&
      tableRef.current &&
      (tableRef.current as any).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const { data, loading } = useFetch<DelegationOverview>(`/delegation/pool-detail-header/${poolId}`);
  const {
    data: analyticsData,
    loading: loadingAnalytics,
    initialized,
  } = useFetch<AnalyticsDelegators>(`/delegation/pool-detail-analytics?pool=${poolId}`);
  const {
    data: dataTable,
    loading: loadingTable,
    total,
  } = useFetchList<DelegationEpoch | StakingDelegators>(
    `/delegation/pool-detail-${tab}?pool=${poolId}&page=${query.page || 1}&size=${query.size || 10}`
  );

  const listDetails = [
    {
      title: "Ticker",
      value: data?.tickerName || "",
    },

    {
      title: "Pool ID",
      value: poolId,
    },
    {
      title: "Created date",
      value: data?.createDate || "",
    },
    {
      title: "Reward Account",
      value: (
        <>
          <Tooltip placement="bottom" title={data?.rewardAccount || ""}>
            <Link to={"#"} className={styles.link}>
              {getShortWallet(data?.rewardAccount || "")}
            </Link>
          </Tooltip>
          <CopyButton text={data?.rewardAccount || ""} />
        </>
      ),
    },
    {
      title: "Owner Account",
      value: (
        <>
          <Tooltip placement="bottom" title={data?.ownerAccount || ""}>
            <Link to={"#"} className={styles.link}>
              {getShortWallet(data?.ownerAccount || "")}
            </Link>
          </Tooltip>
          <CopyButton text={data?.ownerAccount || ""} />
        </>
      ),
    },
  ];

  const render = () => {
    if (tab === "epochs") {
      return (
        <div ref={tableRef}>
          <DelegationEpochList
            data={dataTable as DelegationEpoch[]}
            loading={loadingTable}
            initialized={initialized}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      );
    }
    if (tab === "delegators") {
      return (
        <div ref={tableRef}>
          <DelegationStakingDelegatorsList
            data={dataTable as StakingDelegators[]}
            loading={loadingTable}
            initialized={initialized}
            total={total}
            scrollEffect={scrollEffect}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <Card
        title={
          <>
            Pool: <span className={styles.title}>{data?.poolName || ""}</span>{" "}
          </>
        }
      >
        <DetailCard
          loading={loading}
          listDetails={listDetails}
          delegationPools={{
            poolSize: (
              <span className={styles.price}>
                {formatADA(data?.poolSize || 0)}
                <img className={styles.img} src={AIcon} alt="ada icon" />
              </span>
            ),
            stakeLimit: (
              <span className={styles.price}>
                {formatADA(data?.stakeLimit || 0)}
                <img className={styles.img} src={AIcon} alt="ada icon" />
              </span>
            ),
            delegators: data?.delegators || 0,
            satulation: 0,
          }}
        />
      </Card>
      <OverviewCard data={data} loading={loading} />
      <DelegationDetailChart data={analyticsData} loading={loadingAnalytics} />
      <Card
        title={title[tab]}
        extra={
          <div className={styles.filter}>
            <SelectComponent
              value={tab || "epochs"}
              onChange={e => {
                setTab(e.target.value as typeof tab);
                setQuery({ page: 1, size: 10 });
                scrollEffect();
              }}
            >
              <OptionSelect value={"epochs"}>Epochs</OptionSelect>
              <OptionSelect value={"delegators"}>Staking delegators</OptionSelect>
            </SelectComponent>
          </div>
        }
      >
        {render()}
      </Card>
    </div>
  );
};

export default DelegationDetail;

const OverviewCard = ({ data, loading }: { data: DelegationOverview | null; loading: boolean }) => {
  let overviewData = {
    Reward: data?.reward ? `${data.reward}%` : "0%",
    Fee: data?.fee ? `${data.fee}%` : "0%",
    ROS: data?.ros ? `${data.ros}%` : "0%",
    "Pledge(A)": formatADA(data?.pledge) || 0,
    "Cost(A)": formatADA(data?.cost) || 0,
    Margin: data?.margin ? `${data.margin}%` : "0%",
    "Epoch Block": data?.epochBlock || 0,
    "Lifetime Block": numberWithCommas(data?.lifetimeBlock || 0),
  };
  if (loading) {
    return (
      <div className={styles.overview}>
        <Grid container columns={24} spacing={2}>
          {Object.keys(overviewData).map((i, ii) => {
            return (
              <Grid item xs={12} sm={8} md={6} key={ii} xl={3} className={styles.col}>
                <Skeleton variant="rectangular" className={styles.itemSkeleton} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
  return (
    <div className={styles.overview}>
      <Grid container columns={24} spacing={2}>
        {Object.keys(overviewData).map((i, ii) => {
          return (
            <Grid item xs={12} sm={8} md={6} key={ii} xl={3} className={styles.col}>
              <div className={styles.item}>
                <div>
                  <div className={styles.title}>{i}</div>
                  <div className={styles.value}>{overviewData[i as keyof typeof overviewData]}</div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const title = {
  epochs: "Epoch",
  delegators: "Staking delegators",
};

const SelectComponent = styled("select")(({ theme }) => ({
  height: "40px",
  minWidth: 250,
  borderRadius: theme.borderRadius,
  border: "1px solid #0000001a",
  padding: "0 10px",
  color: theme.textColor,
  textAlignLast: "left",
  ":focus-visible": {
    outline: "none",
  },
}));

const OptionSelect = styled("option")(({ theme }) => ({
  padding: "6px 0",
  textAlign: "center",
  height: "40px",
}));
