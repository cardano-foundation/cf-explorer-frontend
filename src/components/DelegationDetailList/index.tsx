import Table, { Column } from "../commons/Table";

const DelegationDetailList = () => {
  const columns: Column<DelegatorEpoch>[] = [
    {
      title: "Epoch",
      key: "epoch",
      minWidth: "120px",
    },
    {
      title: "Blocks",
      key: "block",
      minWidth: "120px",
    },
    {
      title: "Stake Amount(A)",
      key: "stakeAmount",
      minWidth: "120px",
    },
    {
      title: "Delegator Reward(A)",
      key: "delegatorReward",
      minWidth: "120px",
    },
    {
      title: "Fees(A)",
      key: "fees",
      minWidth: "120px",
    },
    {
      title: "ROS",
      key: "ros",
      minWidth: "120px",
    },
  ];

  return <Table columns={columns} data={fakeData} />;
};

export default DelegationDetailList;

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
