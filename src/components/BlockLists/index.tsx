import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import moment from "moment";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { getShortWallet } from "../../commons/utils/helper";

import styles from "./index.module.scss";
import AIcon from "../../commons/resources/images/AIcon.png";

const BlockList = () => {
  const columns: Column<Block>[] = [
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: (r) => {
        return <span className={styles.fwBlod}>{r.slot}</span>;
      },
    },
    {
      title: "Block Id",
      key: "blockId",
      minWidth: "150px",
      render: (r) => (
        <Link
          to={`/block-list/${r.blockId}`}
          className={`${styles.fwBlod} ${styles.link}`}
        >
          <div>{getShortWallet(r.blockId)}</div>
          <BiLinkExternal fontSize={18} style={{ marginLeft: 8 }} />
        </Link>
      ),
    },
    {
      title: "Created at",
      key: "createdAt",
      minWidth: "150px",
      render: (r) => (
        <>
          {r.createdAt ? moment(r.createdAt).format("MM/DD/YYYY HH:mm:ss") : ""}
        </>
      ),
    },
    {
      title: "Transactions",
      key: "transactions",
      minWidth: "150px",
      render: (r) => <div className={styles.fwBlod}>{r.transactions}</div>,
    },
    {
      title: "Fees",
      key: "fees",
      render: (r) => (
        <div className={styles.fwBlod}>
          <img src={AIcon} alt="a icon" /> {r.fees || 0}
        </div>
      ),
    },
    {
      title: "Output",
      key: "output",
      render: (r) => (
        <div className={styles.fwBlod}>
          <img src={AIcon} alt="a icon" /> {r.output || 0}
        </div>
      ),
      minWidth: "100px",
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        className={styles.table}
        columns={columns}
        data={data}
        total={{ count: 1000, title: "Total Transactions" }}
        pagination={{
          defaultCurrent: 1,
          total: 50,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          size: "small",
          pageSizeOptions: [10, 20, 50],
          onChange(page, pageSize) {
            console.log(page, pageSize);
          },
        }}
      />
    </Card>
  );
};

export default BlockList;

const data = [
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fees: 0.25461,
    output: 1333.25461,
  },
];
