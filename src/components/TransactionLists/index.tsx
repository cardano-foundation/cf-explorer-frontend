import { Link } from "react-router-dom";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { BiLinkExternal } from "react-icons/bi";
import { getShortWallet } from "../../commons/utils/helper";
import styles from "./index.module.scss";

import AIcon from "../../commons/resources/images/AIcon.png";
import moment from "moment";

const BlockList = () => {
  const columns: Column<Transactions>[] = [
    {
      title: "#",
      key: "id",
      minWidth: "40px",
      render: (data, index) => {
        return <div className={styles.fwBold}>{index + 1}</div>;
      },
    },
    {
      title: "Trx Hash",
      key: "trxhash",
      minWidth: "200px",

      render: (r) => (
        <div>
          <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
            {getShortWallet("d0437081d2a1234b12342506307")}
          </Link>
          <div>
            {moment("2022-11-15T08:52:40.188Z").format("MM/DD/YYYY HH:mm:ss")}
          </div>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: "200px",
      render: (r) => (
        <>
          <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
            7903486369
          </Link>
          / 205687
        </>
      ),
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render(data, index) {
        return (
          <div>
            <div className={styles.output}>
              Input:
              <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                {getShortWallet("d0437081d2a1234b12342506307")}
                <BiLinkExternal style={{ marginLeft: 8 }} />
              </Link>
            </div>
            <div className={styles.output}>
              <div>Output: </div>
              <div>
                <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                  {getShortWallet("d0437081d2a1234b12342506307")}
                  <BiLinkExternal style={{ marginLeft: 8 }} />
                </Link>
                <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                  ...
                </Link>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Fees",
      key: "fee",
      minWidth: "120px",
      render: (r) => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {r.fee || 0}
        </div>
      ),
    },
    {
      title: "Output",
      minWidth: "120px",
      key: "ouput",
      render: (r) => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {r.ouput || 0}
        </div>
      ),
    },
  ];

  return (
    <Card title={"Transactions"}>
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
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
  {
    slot: 7903486,
    blockId: "d0437081d2a1234b12342506307",
    createdAt: "2022-11-15T08:52:40.188Z",
    transactions: 18,
    fee: 0.25461,
    ouput: 1333.25461,
  },
];
