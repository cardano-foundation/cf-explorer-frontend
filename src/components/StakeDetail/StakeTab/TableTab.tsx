import { Box } from "@mui/material";
import Table, { Column } from "../../commons/Table";

interface TableTabProps {
  type: TabStakeDetail;
}

interface columnProps {
  delegation: Column<{ trxHash: string; time: string; block: number; poolId: string; poolName: string }>[];
  stakeKey: Column<{ trxHash: string; time: string; block: number; action: string }>[];
  withdrawal: Column<{ trxHash: string; time: string; block: number; amount: number }>[];
  instantaneous: Column<{ trxHash: string; time: string; block: number; rewardPaid: number; orther: string }>[];
}
const TableTab: React.FC<TableTabProps> = ({ type }) => {
  const column: columnProps = {
    delegation: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => r.trxHash,
      },
      {
        title: "Time",
        key: "time",
        minWidth: "120px",
        render: r => r.time,
      },
      {
        title: "Block",
        key: "block",
        minWidth: "120px",
        render: r => r.block,
      },
      {
        title: "Pool ID",
        key: "poolId",
        minWidth: "120px",
        render: r => r.poolId,
      },
      {
        title: "Pool Name",
        key: "poolName",
        minWidth: "120px",
        render: r => r.poolName,
      },
    ],
    stakeKey: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => r.trxHash,
      },
      {
        title: "Time",
        key: "time",
        minWidth: "120px",
        render: r => r.time,
      },
      {
        title: "Block",
        key: "block",
        minWidth: "120px",
        render: r => r.block,
      },
      {
        title: "Action",
        key: "action",
        minWidth: "120px",
        render: r => r.action,
      },
    ],
    withdrawal: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => r.trxHash,
      },
      {
        title: "Time",
        key: "time",
        minWidth: "120px",
        render: r => r.time,
      },
      {
        title: "Block",
        key: "block",
        minWidth: "120px",
        render: r => r.block,
      },
      {
        title: "Amount",
        key: "amount",
        minWidth: "120px",
        render: r => r.amount,
      },
    ],
    instantaneous: [
      {
        title: "Trx Hash",
        key: "hash",
        minWidth: "120px",
        render: r => r.trxHash,
      },
      {
        title: "Time",
        key: "time",
        minWidth: "120px",
        render: r => r.time,
      },
      {
        title: "Block",
        key: "block",
        minWidth: "120px",
        render: r => r.block,
      },
      {
        title: "Reward Paid",
        key: "rewardPaid",
        minWidth: "120px",
        render: r => r.rewardPaid,
      },
      {
        title: "Other Stake Keys",
        key: "otherStakeKeys",
        minWidth: "120px",
        render: r => r.orther,
      },
    ],
  };

  return <Table columns={column[type]} data={[]} />;
};

export default TableTab;
