import { useState } from "react";
import { Col, Input, Progress, Row, Skeleton } from "antd";
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
          <Input
            className={styles.input}
            size="large"
            placeholder="Search transaction, address, block, epoch, pool..."
            prefix={<img src={searchImg} alt="search icon" />}
            onChange={e => setSearchPools(e.target.value)}
            value={searchPools || ""}
            onKeyUp={e => {
              if (e.key === "Enter") {
                setQuery({ searchPools, page: 1, size: 10 });
              }
            }}
          />
          <button
            className={styles.button}
            onClick={() => {
              setQuery({ searchPools, page: 1, size: 10 });
            }}
          >
            Search
          </button>
        </div>
      </div>
      <DelegationLists data={delegationLists} total={total} loading={loading} />
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
      <Row gutter={[10, 10]}>
        <Col span={24} md={12} xl={8}>
          <Skeleton.Input block active className={styles.sekeletion} />
        </Col>
        <Col span={24} md={12} xl={8}>
          <Skeleton.Input block active className={styles.sekeletion} />
        </Col>
        <Col span={24} md={12} xl={8}>
          <Skeleton.Input block active className={styles.sekeletion} />
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[10, 10]}>
      <Col span={24} md={12} xl={8}>
        <div className={styles.card}>
          <div>
            <div className={styles.title}>Epoch</div>
            <div className={styles.subtitle}>
              {/* To Do */}
              End in:{" "}
              <span className={styles.value}>
                {duration.days()} day {duration.hours()} hours {duration.minutes()} minutes
              </span>
            </div>
          </div>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#184C78",
              "100%": "#5A9C56",
            }}
            status="active"
            format={() => (
              <>
                <div className={styles.epochTitle}>{data?.epochNo || 0} </div>
              </>
            )}
            strokeWidth={6}
            width={96}
            percent={((data?.epochSlotNo || 0) / 432000) * 100}
          />
        </div>
      </Col>
      <Col span={24} md={12} xl={8}>
        <div className={styles.card}>
          <div style={{ width: "80%" }}>
            <div className={styles.title}>Slot</div>
            <div className={styles.subtitle}>
              {" "}
              <span className={styles.value}>{data?.epochSlotNo || 0} / </span>432000
            </div>
            <Progress
              type="line"
              strokeColor={{
                "0%": "#184C78",
                "100%": "#5A9C56",
              }}
              strokeWidth={8}
              width={200}
              percent={((data?.epochSlotNo || 0) / 432000) * 100}
              format={(p, c) => ""}
              status="active"
            />
          </div>
          <div>
            <img src={rocketImg} alt="rocket icon" />
          </div>
        </div>
      </Col>
      <Col span={24} md={12} xl={8}>
        <div className={styles.card}>
          {" "}
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
      </Col>
    </Row>
  );
};
