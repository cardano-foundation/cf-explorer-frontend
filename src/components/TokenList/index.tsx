import { stringify } from "qs";
import React from "react";
import { useHistory } from "react-router-dom";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";
import { routers } from "../../commons/routers";
import AIcon from "../../commons/resources/images/AIcon.png";
// import { routers } from "../../commons/routers";

import styles from "./index.module.scss";
import moment from "moment";

interface ITokenListTable {
  // TODO
  tokenList: Token[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const TokenListTable: React.FC<ITokenListTable> = ({ tokenList, loading, total, totalPage, currentPage }) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<Token>[] = [
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (r.icon ? "Icon Here" : <img src={AIcon} alt="ADA Icon" />),
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "150px",
      render: r => <span className={`${styles.link} ${styles.fwBold}`}>{r.assetName}</span>,
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => <>{r.totalTransactions}</>,
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <>{r.totalSupply}</>,
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => <>{moment(r.createdTime).format("MM/DD/YYYY HH:mm:ss")}</>,
    },
  ];

  return (
    <Card title="Token List">
      <Table
        className={styles.table}
        loading={loading}
        columns={columns}
        data={tokenList}
        total={{ count: total, title: "Total Transactions" }}
        onClickRow={(_, r) => history.push(routers.TOKEN_DETAIL.replace(":tokenId", r.assetName))}
        pagination={{
          current: currentPage + 1 || 1,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          size: "small",
          pageSizeOptions: [10, 20, 50],
          onChange(page, pageSize) {
            setQuery({ page, size: pageSize });
          },
        }}
      />
    </Card>
  );
};

export default TokenListTable;
