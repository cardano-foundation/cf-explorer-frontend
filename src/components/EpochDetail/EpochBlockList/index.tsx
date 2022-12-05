import React from "react";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";

import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";

import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { routers } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";

import { StyledAddress, StyledBold, StyledDiv, StyledCopyIcon, StyledLink, StyledOutput, StyledAIcon } from "./styles";
import { Tooltip } from "@mui/material";

// import styles from "./index.module.scss";

interface IEpochBlockList {
  data: Block[];
  loading: boolean;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
}

const EpochBlockList: React.FC<IEpochBlockList> = ({ data, loading, initialized, total, totalPage, currentPage }) => {
  const history = useHistory();
  const setQuery = (query: any) => {
    history.push({ search: stringify(query) });
  };

  const columns: Column<BlockDetail>[] = [
    {
      title: "#",
      key: "#",
      minWidth: "100px",
      render: (_, index) => {
        return <StyledDiv>{index + 1}</StyledDiv>;
      },
    },
    {
      title: "Block",
      key: "block",
      minWidth: "100px",
      render: r => <StyledLink>{r.blockNo}</StyledLink>,
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        <>
          <StyledLink>{r.slotNo}</StyledLink>
          <div>
            <StyledLink>{r.epochNo}</StyledLink>/ {r.epochSlotNo}
          </div>
        </>
      ),
    },
    {
      title: "Created by",
      key: "createdBy",
      minWidth: "100px",
      render: r => (
        <>
          Address:
          <Tooltip placement="top" title={r.slotLeader}>
            <StyledAddress>
              {getShortWallet(r.slotLeader ?? "")}
              <StyledCopyIcon />
            </StyledAddress>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Transactions",
      key: "blkCount",
      minWidth: "100px",
      render: r => <StyledBold>{r.txCount}</StyledBold>,
    },
    {
      title: "Output",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <StyledOutput>
          <StyledAIcon src={AIcon} alt="ADA Icon" />
          <StyledBold>{formatADA(r.totalFees) || 0}</StyledBold>
        </StyledOutput>
      ),
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        // className={styles.table}
        loading={loading}
        initialized={initialized}
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
