import { stringify } from "qs";
import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Card from "../commons/Card";
import TokenLogo from "../commons/TokenLogo";
import Table, { Column } from "../commons/Table";
import { routers } from "../../commons/routers";
import { numberWithCommas } from "../../commons/utils/helper";
// import { routers } from "../../commons/routers";

import styles from "./index.module.scss";

interface ITokenListTable {
  // TODO
  tokenList: IToken[];
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

  const columns: Column<IToken>[] = [
    {
      title: "Logo",
      key: "logo",
      minWidth: "100px",
      render: r => <TokenLogo tokenId={r.tokenId} className={styles.logo} />,
    },
    {
      title: "Asset Name",
      key: "assetName",
      minWidth: "150px",
      render: r => <span className={styles.link}>{r.assetName}</span>,
    },
    {
      title: "Total Transactions",
      key: "totalTransactions",
      minWidth: "150px",
      render: r => <>{numberWithCommas(r.totalTransactions)}</>,
    },
    {
      title: "Total Supply",
      key: "totalSupply",
      minWidth: "150px",
      render: r => <>{numberWithCommas(r.totalSupply)}</>,
    },
    {
      title: "Created",
      key: "created",
      minWidth: "150px",
      render: r => <>{moment(r.dateCreated).format("MM/DD/YYYY HH:mm:ss")}</>,
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
        onClickRow={(_, r) => history.push(routers.TOKEN_DETAIL.replace(":tokenId", r.tokenId))}
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
