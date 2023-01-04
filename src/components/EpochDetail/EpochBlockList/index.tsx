import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";

import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { formatADA, getPageInfo, getShortWallet } from "../../../commons/utils/helper";
import { details } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import { StyledAddress, StyledLink, StyledOutput, StyledColorBlueDard, StyledContainer } from "./styles";
import CustomTooltip from "../../commons/CustomTooltip";
import useFetchList from "../../../commons/hooks/useFetchList";

interface IEpochBlockList {
  epochId: string;
}

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
        Input:
        <CustomTooltip placement="top" title={r.slotLeader}>
          <StyledAddress to={details.address(r.slotLeader)}>{getShortWallet(r.slotLeader)}</StyledAddress>
        </CustomTooltip>
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

const EpochBlockList: React.FC<IEpochBlockList> = ({ epochId }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<BlockDetail>(`block/list?epochNo=${epochId}`, pageInfo);

  return (
    <StyledContainer>
      <Card title={"Blocks"} underline={true}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Blocks", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
          onClickRow={(_, r) => history.push(details.block(r.blockNo))}
        />
      </Card>
    </StyledContainer>
  );
};

export default EpochBlockList;
