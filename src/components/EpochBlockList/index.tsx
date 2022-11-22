import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { stringify } from "qs";

import Card from "../commons/Card";
import Table, { Column } from "../commons/Table";

import { formatADA, getShortWallet } from "../../commons/utils/helper";
import AIcon from "../../commons/resources/images/AIcon.png";
import { routers } from "../../commons/routers";

import styles from "./index.module.scss";

interface IEpochBlockList {
  data: Block[];
  loading: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const EpochBlockList: React.FC<IEpochBlockList> = ({ data, loading, total, totalPage, currentPage }) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };
  console.log(data);
  

  const columns: Column<BlockDetail>[] = [
    {
      title: "#",
      key: "#",
      minWidth: "100px",
      render: (data, index) => {
        return <div className={styles.fwBold}>{index + 1}</div>;
      },
    },
    {
      title: "Block",
      key: "block",
      minWidth: "100px",
      render: r => (
        <Link
          to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}
          className={`${styles.fwBold} ${styles.link}`}
        >
          <span>{r.blockNo}</span>
        </Link>
      ),
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        // TODO: Update slot format base on BE output
        <div style={{display: "flex", alignItems: "center"}}>
          <Link to={"#"} className={`${styles.fwBold} ${styles.link}`}>{r.slotNo}</Link><span> / {}</span>
        </div>
      ),
    },
    {
      title: "Created by",
      key: "createdBy",
      minWidth: "100px",
      render: r => {
        return (
          <div className={styles.input}>
            Input:
            <Link to={`#`} className={`${styles.fwBold} ${styles.link}`} style={{ marginLeft: 15 }}>
              {getShortWallet(r.slotLeader ?? "")}
              <BiLinkExternal fontSize={18} style={{ marginLeft: 8 }} />
            </Link>
          </div>
        );
      },
    },
    {
      title: "Transactions",
      key: "blkCount",
      minWidth: "100px",
      render: r => {
        return <span className={styles.fwBold}>{r.txCount}</span>;
      },
    },
    {
      title: "Output",
      key: "outSum",
      minWidth: "100px",
      render: r => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ marginRight: "8px" }} src={AIcon} alt="a icon" />
            <span className={styles.fwBold}>{formatADA(r.totalFees) || 0}</span>
          </div>
        );
      },
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        className={styles.table}
        columns={columns}
        data={data}
        total={{ count: total, title: "Total Transactions" }}
        pagination={{
          defaultCurrent: 1,
          total: totalPage,
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

export default EpochBlockList;
