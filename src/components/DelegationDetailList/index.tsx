import { Link, useHistory } from "react-router-dom";

import { routers } from "../../commons/routers";
import { formatADA, getShortWallet, numberWithCommas } from "../../commons/utils/helper";
import Table, { Column } from "../commons/Table";
import styles from "./index.module.scss";

const DelegationEpochList = () => {
  const history = useHistory();

  const columns: Column<DelegatorEpoch>[] = [
    {
      title: "Epoch",
      key: "epoch",
      minWidth: "120px",
      render: r => (
        <Link className={`${styles.col} ${styles.link}`} to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`)}>
          {r.epoch}
        </Link>
      ),
    },
    {
      title: "Blocks",
      key: "block",
      minWidth: "120px",
      render: data => (
        <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${data.block}`)} className={`${styles.col} ${styles.link}`}>
          {numberWithCommas(data.block)}
        </Link>
      ),
    },
    {
      title: "Stake Amount(A)",
      key: "stakeAmount",
      minWidth: "120px",
      render: data => <div className={styles.col}> {formatADA(data.stakeAmount)}</div>,
    },
    {
      title: "Delegator Reward(A)",
      key: "delegatorReward",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.delegatorReward)}</div>,
    },
    {
      title: "Fees(A)",
      key: "fees",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.fees)}</div>,
    },
    {
      title: "ROS",
      key: "ros",
      minWidth: "120px",
      render: data => <div className={styles.col}>{data.ros}%</div>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={fakeData}
      onClickRow={(_, r) => history.push(routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`))}
      total={{ count: 51800888, title: "Total Transactions" }}
      pagination={{
        current: 1,
        total: 51800888,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        size: "small",
        pageSizeOptions: [10, 20, 50],
        // onChange(page, pageSize) {
        //   setQuery({ page, size: pageSize });
        // },
      }}
    />
  );
};

const DelegationStakingDelegatorsList = () => {
  const history = useHistory();

  const columns: Column<StakingDelegators>[] = [
    {
      title: "No",
      key: "no",
      render: (r, idx) => <div className={styles.col}> {idx + 1}</div>,
    },
    {
      title: "Delegator",
      key: "delegator",
      minWidth: "180px",
      render: data => (
        <Link to={"#"} className={`${styles.col} ${styles.link}`}>
          {getShortWallet(data.delegator)}
        </Link>
      ),
    },
    {
      title: "Total Value(A)",
      key: "value",
      minWidth: "120px",
      render: data => <div className={styles.col}> {formatADA(data.value)}</div>,
    },
    {
      title: "Staked Time",
      key: "stakedTime",
      minWidth: "120px",
      render: data => <div className={styles.col}>{data.stekedTime}</div>,
    },
    {
      title: "Fees(A)",
      key: "fees",
      minWidth: "120px",
      render: data => <div className={styles.col}>{formatADA(data.fee)}</div>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={fakeDataDelegator}
      // onClickRow={(_, r) => history.push(routers.EPOCH_DETAIL.replace(":epochId", `${r.epoch}`))}
      total={{ count: 51800888, title: "Total Transactions" }}
      pagination={{
        current: 1,
        total: 51800888,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        size: "small",
        pageSizeOptions: [10, 20, 50],
        // onChange(page, pageSize) {
        //   setQuery({ page, size: pageSize });
        // },
      }}
    />
  );
};

export { DelegationEpochList, DelegationStakingDelegatorsList };

const fakeData = [
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
  {
    epoch: 312,
    block: 325268,
    stakeAmount: 120000000000,
    delegatorReward: 120000000000,
    fees: 120000000000,
    ros: 100,
  },
];

const fakeDataDelegator = [
  {
    delegator: "stake_test1uz9y7juwzcyanva4x4fzpx7tft6ckntn6ulsjjd2k7a0pxgldmzp5",
    value: 135687,
    stekedTime: "26/09/2022 13:02:39",
    fees: 12000000000,
  },
  {
    delegator: "stake_test1uz9y7juwzcyanva4x4fzpx7tft6ckntn6ulsjjd2k7a0pxgldmzp5",
    value: 135687,
    stekedTime: "26/09/2022 13:02:39",
    fees: 12000000000,
  },
  {
    delegator: "stake_test1uz9y7juwzcyanva4x4fzpx7tft6ckntn6ulsjjd2k7a0pxgldmzp5",
    value: 135687,
    stekedTime: "26/09/2022 13:02:39",
    fees: 12000000000,
  },
  {
    delegator: "stake_test1uz9y7juwzcyanva4x4fzpx7tft6ckntn6ulsjjd2k7a0pxgldmzp5",
    value: 135687,
    stekedTime: "26/09/2022 13:02:39",
    fees: 12000000000,
  },
  {
    delegator: "stake_test1uz9y7juwzcyanva4x4fzpx7tft6ckntn6ulsjjd2k7a0pxgldmzp5",
    value: 135687,
    stekedTime: "26/09/2022 13:02:39",
    fees: 12000000000,
  },
];
