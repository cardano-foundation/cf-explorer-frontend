import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { DelegationEpochList, DelegationStakingDelegatorsList } from "../../components/DelegationDetailList";
import DelegationDetailChart from "../../components/DelegationDetailChart";
import DetailCard from "../../components/commons/DetailCard";

import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import CopyText from "../../components/commons/CopyText";
import { formatADA, getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import AIcon from "../../commons/resources/images/AIcon.png";
import { Col, Row, Select } from "antd";

import "./select.css";

const DelegationDetail = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const [tab, setTab] = useState<"epoch" | "stakingDelegators">("epoch");
  const { data } = useFetch<Delegator>(`/delegation/pool-detail/${poolId}`);

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
          <Link to={"#"} className={styles.link}>
            {getShortWallet(data?.rewardAccount || "")}
          </Link>
          <CopyText text={data?.rewardAccount || ""} />
        </>
      ),
    },
    {
      title: "Owner Account",
      value: (
        <>
          <Link to={"#"} className={styles.link}>
            {getShortWallet(data?.ownerAccount || "")}
          </Link>
          <CopyText text={data?.ownerAccount || ""} />
        </>
      ),
    },
  ];

  const render = () => {
    if (tab === "epoch") {
      return <DelegationEpochList />;
    }
    if (tab === "stakingDelegators") {
      return <DelegationStakingDelegatorsList />;
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
          loading={false}
          listDetails={listDetails}
          delegationPools={{
            poolSize: (
              <span className={styles.price}>
                {formatADA(data?.poolSize || 9898)}
                <img className={styles.img} src={AIcon} alt="ada icon" />
              </span>
            ),
            stakeLimit: (
              <span className={styles.price}>
                {formatADA(data?.stakeLimit || 9898)}
                <img className={styles.img} src={AIcon} alt="ada icon" />
              </span>
            ),
            delegators: data?.delegators || 0,
            satulation: "50%",
          }}
        />
      </Card>
      <OverviewCard />
      <DelegationDetailChart />
      <Card
        title={title[tab]}
        extra={
          <div className={styles.filter}>
            <Select
              options={[
                { label: "Epoch", value: "epoch" },
                { label: "Staking delegators", value: "stakingDelegators" },
              ]}
              value={tab || "epoch"}
              style={{ borderRadius: "8px", minWidth: 250 }}
              onChange={e => setTab(e)}
            />
          </div>
        }
      >
        {render()}
      </Card>
    </div>
  );
};

export default DelegationDetail;

const OverviewCard = () => {
  return (
    <div className={styles.overview}>
      <Row gutter={8} justify="center">
        {dataOverviewFake.map((i, ii) => {
          return (
            <Col key={ii} className={styles.col} span={12} sm={8} md={6} xl={4} xxl={3}>
              <div className={styles.item}>
                <div>
                  <div className={styles.title}>{i.title}</div>
                  <div className={styles.value}>{i.value}</div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const title = {
  epoch: "Epoch",
  analytics: "Analytics",
  stakingDelegators: "Staking delegators",
};

const dataOverviewFake = [
  {
    title: "Reward",
    value: "5%",
  },
  {
    title: "Fee",
    value: "2.1%",
  },
  {
    title: "ROS",
    value: "100%",
  },
  {
    title: "Pledge(A)",
    value: "1m",
  },
  {
    title: "Cost(A)",
    value: "8,888,888",
  },
  {
    title: "Margin",
    value: "0%",
  },
  {
    title: "Epoch Block",
    value: "25",
  },
  {
    title: "Lifetime Block",
    value: "12,568",
  },
];
