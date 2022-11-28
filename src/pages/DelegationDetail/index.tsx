import { Link, useParams } from "react-router-dom";

import DelegationDetailList from "../../components/DelegationDetailList";

import useFetch from "../../commons/hooks/useFetch";
import Card from "../../components/commons/Card";
import DetailCard from "../../components/commons/DetailCard";
import CopyText from "../../components/commons/CopyText";
import { formatADA, getShortWallet, numberWithCommas } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import AIcon from "../../commons/resources/images/AIcon.png";
import { Select } from "antd";

const DelegationDetail = () => {
  const { poolId, tab } = useParams<{ poolId: string; tab: "epoch" | "analytics" | "stakingDelegators" }>();
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
      <div className={styles.content}>
        <div className={styles.filter}>
          <Select
            options={[
              { label: "Epoch", value: "epoch" },
              { label: "Analytics", value: "analytics" },
              { label: "Staking delegators", value: "stakingDelegators" },
            ]}
            value={tab || "epoch"}
            style={{ borderRadius: "8px", minWidth: 250 }}
          />
        </div>
        <DelegationDetailList />
      </div>
    </div>
  );
};

export default DelegationDetail;

const OverviewCard = () => {
  return (
    <div className={styles.overview}>
      <div className={styles.content}>
        <div className={styles.item}>
          <div className={styles.title}>Reward</div>
          <div className={`${styles.value} ${styles.reward}`}>5%</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Fee</div>
          <div className={styles.value}>2.1%</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Pledge (A) </div>
          <div className={styles.value}>1m</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Epoch Block </div>
          <div className={styles.value}>25</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Lifetime Block </div>
          <div className={styles.value}>{numberWithCommas(12568)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>ROS</div>
          <div className={styles.value}>100%</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Saturation</div>
          <div className={styles.value}>78%</div>
        </div>
      </div>
    </div>
  );
};
