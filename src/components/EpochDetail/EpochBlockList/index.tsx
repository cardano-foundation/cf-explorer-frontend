import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { stringify } from "qs";

import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";

import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { routers } from "../../../commons/routers";

import styles from "./index.module.scss";
import { Tooltip } from "antd";
import { AIcon } from "../../../commons/resources";

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
      render: r => (
        <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
          <span className={`${styles.fwBold} ${styles.link}`}>{r.blockNo}</span>
        </Link>
      ),
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        <>
          <span className={`${styles.fwBold} ${styles.link}`}>{r.slotNo}</span>
          <div>
            <Link to={routers.EPOCH_DETAIL.replace(":epochId", `${r.epochNo}`)}>
              <span className={`${styles.fwBold} ${styles.link}`}>{r.epochNo}</span>
            </Link>{" "}
            / {r.epochSlotNo}
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
            <Tooltip placement="top" title={r.slotLeader}>
              <Link to={routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`)}>
                <span className={`${styles.fwBold} ${styles.link} ${styles.ml15}`}>
                  {getShortWallet(r.slotLeader ?? "")}
                  <BiLinkExternal className={styles.icon} />
                </span>
              </Link>
            </Tooltip>
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
        loading={loading}
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
