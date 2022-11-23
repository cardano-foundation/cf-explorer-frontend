import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { useHistory } from "react-router-dom";
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
      render: r => <span className={`${styles.fwBold} ${styles.link}`}>{r.blockNo}</span>,
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        <>
          <span className={`${styles.fwBold} ${styles.link}`}>{r.slotNo}</span>
          <div>
            <span className={`${styles.fwBold} ${styles.link}`}>{r.epochNo}</span> / {r.epochSlotNo}
          </div>
        </>
      ),
    },
    {
      title: "Created by",
      key: "createdBy",
      minWidth: "100px",
      render: r => {
        return (
          <>
            Address:
            <span className={`${styles.fwBold} ${styles.link} ${styles.ml15}`}>
              {getShortWallet(r.slotLeader ?? "")}
              <BiLinkExternal className={styles.icon} />
            </span>
          </>
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
        onClickRow={(_, r) => history.push(routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`))}
        pagination={{
          current: currentPage + 1 || 1,
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
