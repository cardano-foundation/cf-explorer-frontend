import React from "react";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Tooltip } from "@mui/material";

import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { routers } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import CopyButton from "../../commons/CopyButton";

import { StyledAddress, StyledLink, StyledOutput, StyledAIcon } from "./styles";

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
        return <b>{index + 1}</b>;
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
            <StyledAddress to={"#"}>
              {getShortWallet(r.slotLeader)}
              <CopyButton text={r.slotLeader}/>
            </StyledAddress>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Transactions",
      key: "blkCount",
      minWidth: "100px",
      render: r => <b>{r.txCount}</b>,
    },
    {
      title: "Output",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <StyledOutput>
          <StyledAIcon src={AIcon} alt="ADA Icon" />
          <b>{formatADA(r.totalFees) || 0}</b>
        </StyledOutput>
      ),
    },
  ];

  return (
    <Card title={"Blocks"}>
      <Table
        loading={loading}
        initialized={initialized}
        columns={columns}
        data={data}
        total={{ count: total, title: "Total Transactions" }}
        onClickRow={(_, r) => history.push(routers.BLOCK_DETAIL.replace(":blockId", `${r.blockNo}`))}
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

export default EpochBlockList;
