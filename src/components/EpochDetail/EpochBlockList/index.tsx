import React from "react";
import { useHistory } from "react-router-dom";
import { stringify } from "qs";
import { Tooltip } from "@mui/material";

import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { formatADA, getShortWallet } from "../../../commons/utils/helper";
import { routers } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";

import { StyledAddress, StyledLink, StyledOutput, StyledColorBlueDard, StyledContainer } from "./styles";

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
      minWidth: "50px",
      render: (_, index) => {
        return <StyledColorBlueDard>{index + 1}</StyledColorBlueDard>;
      },
    },
    {
      title: "Block",
      key: "block",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{r.blockNo}</StyledColorBlueDard>,
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        <>
          <StyledLink>{r.slotNo}</StyledLink>
          <div>
            <StyledLink>{r.epochNo}</StyledLink>/{r.epochSlotNo}
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
            <StyledAddress to={routers.ADDRESS_DETAIL.replace(":address", `${r.slotLeader}`)}>{getShortWallet(r.slotLeader)}</StyledAddress>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Transactions",
      key: "blkCount",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{r.txCount}</StyledColorBlueDard>,
    },
    {
      title: "Output",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <StyledOutput>
          <StyledColorBlueDard>{formatADA(r.totalFees) || 0}</StyledColorBlueDard>
          <img src={AIcon} alt="ADA Icon" />
        </StyledOutput>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card title={"Blocks"}>
        <Table
          loading={loading}
          initialized={initialized}
          columns={columns}
          data={data}
          total={{ count: total, title: "Total Blocks" }}
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
    </StyledContainer>
  );
};

export default EpochBlockList;
