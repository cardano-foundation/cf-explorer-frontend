import { Link, useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Tooltip } from "@mui/material";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { BiLinkExternal } from "react-icons/bi";
import { formatADA, getShortHash, getShortWallet } from "../../commons/utils/helper";
import styles from "./index.module.scss";

import moment from "moment";
import { routers } from "../../commons/routers";
import { AIcon } from "../../commons/resources";

interface TransactionListProps {
  transactions: Transactions[];
  loading: boolean;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  currentPage,
  loading,
  initialized,
  total,
  transactions,
}) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

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

      render: r => (
        <div>
          <Tooltip title={r.hash} placement="top">
            <Link
              to={routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`)}
              className={`${styles.fwBold} ${styles.link}`}
              style={{ margin: 0 }}
            >
              {getShortHash(r.hash)}
            </Link>
          </Tooltip>
          <div>{moment(r.time).format("MM/DD/YYYY HH:mm:ss")}</div>
        </div>
      ),
    },
    {
      title: "Block",
      key: "block",
      minWidth: "200px",
      render: r => (
        <>
          <Link
            to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}
            className={`${styles.fwBold} ${styles.link}`}
          >
            {r.blockNo}
          </Link>
          <div style={{ display: "flex" }}>
            <Link
              to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}
              className={`${styles.fwBold} ${styles.link}`}
            >
              {r.epochNo}
            </Link>
            / {r.slot}
          </div>
        </>
      ),
    },
    {
      title: "Address",
      key: "address",
      minWidth: "200px",
      render(r, index) {
        return (
          <div>
            <div className={styles.input}>
              <div className={styles.title}> Input: </div>
              <div>
                {r.addressesInput.slice(0, 2).map((tx, key) => {
                  return (
                    <Tooltip key={key} title={tx} placement="top">
                      <Link to={`#`} className={`${styles.fwBold} ${styles.link}`} key={key}>
                        {getShortWallet(tx)}
                        <BiLinkExternal style={{ marginLeft: 8 }} />
                      </Link>
                    </Tooltip>
                  );
                })}
                {r.addressesInput.length > 2 && (
                  <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                    ...
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.output}>
              <div className={styles.title}>Output: </div>
              <div>
                {r.addressesOutput.slice(0, 2).map((tx, key) => {
                  return (
                    <Tooltip key={key} title={tx} placement="top">
                      <Link to={`#`} className={`${styles.fwBold} ${styles.link}`} key={key}>
                        {getShortWallet(tx)}
                        <BiLinkExternal style={{ marginLeft: 8 }} />
                      </Link>
                    </Tooltip>
                  );
                })}
                {r.addressesOutput.length > 2 && (
                  <Link to={`#`} className={`${styles.fwBold} ${styles.link}`}>
                    ...
                  </Link>
                )}
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
      render: r => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.fee) || 0}
        </div>
      ),
    },
    {
      title: "Output",
      minWidth: "120px",
      key: "ouput",
      render: r => (
        <div className={styles.fwBold}>
          <img src={AIcon} alt="a icon" /> {formatADA(r.totalOutput) || 0}
        </div>
      ),
    },
  ];

  return (
    <Card title={"Transactions"}>
      <Table
        className={styles.table}
        columns={columns}
        data={transactions}
        total={{ count: total, title: "Total Transactions" }}
        loading={loading}
        initialized={initialized}
        onClickRow={(_, r: Transactions) => history.push(routers.TRANSACTION_DETAIL.replace(":trxHash", `${r.hash}`))}
        pagination={{
          onChange: (page, size) => {
            setQuery({ page, size });
          },
          page: currentPage || 0,
          total: total,
        }}
      />
    </Card>
  );
};

export default TransactionList;
