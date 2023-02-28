import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stringify } from "qs";
import Card from "../../commons/Card";
import Table, { Column } from "../../commons/Table";
import { formatADAFull, getPageInfo, getShortHash, numberWithCommas } from "../../../commons/utils/helper";
import { details } from "../../../commons/routers";
import { AIcon } from "../../../commons/resources";
import { FakedLink, StyledOutput, StyledColorBlueDard, StyledContainer } from "./styles";
import useFetchList from "../../../commons/hooks/useFetchList";
import { API } from "../../../commons/utils/api";

interface IEpochBlockList {
  epochId: string;
}

const EpochBlockList: React.FC<IEpochBlockList> = ({ epochId }) => {
  const { search } = useLocation();
  const history = useHistory();
  const pageInfo = getPageInfo(search);

  const fetchData = useFetchList<BlockDetail>(`${API.BLOCK.LIST}?epochNo=${epochId}`, pageInfo);

  const columns: Column<BlockDetail>[] = [
    {
      title: "#",
      key: "#",
      minWidth: "50px",
      render: (_, index) => {
        return (
          <StyledColorBlueDard>{numberWithCommas(pageInfo.page * pageInfo.size + index + 1 || 0)}</StyledColorBlueDard>
        );
      },
    },
    {
      title: "Block",
      key: "block",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{r.blockNo || getShortHash(r.hash || "")}</StyledColorBlueDard>,
    },
    {
      title: "Slot",
      key: "slot",
      minWidth: "100px",
      render: r => (
        <>
          <FakedLink>{r.slotNo}</FakedLink>
          <div>
            {r.epochNo}/{r.epochSlotNo || 0}
          </div>
        </>
      ),
    },
    // {
    //   title: "Created by",
    //   key: "createdBy",
    //   minWidth: "100px",
    //   render: r => (
    //     <>
    //       Input:
    //       <CustomTooltip title={r.slotLeader}>
    //         <StyledLink to={details.address(r.slotLeader)}>{getShortWallet(r.slotLeader)}</StyledLink>
    //       </CustomTooltip>
    //     </>
    //   ),
    // },
    {
      title: "Transactions",
      key: "blkCount",
      minWidth: "100px",
      render: r => <StyledColorBlueDard>{r.txCount || 0}</StyledColorBlueDard>,
    },
    {
      title: "Output",
      key: "outSum",
      minWidth: "100px",
      render: r => (
        <StyledOutput>
          <StyledColorBlueDard>{formatADAFull(r.totalOutput)}</StyledColorBlueDard>
          <img src={AIcon} alt="ADA Icon" />
        </StyledOutput>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Card titleChilren={"Blocks"} underline={true}>
        <Table
          {...fetchData}
          columns={columns}
          total={{ title: "Total Blocks", count: fetchData.total }}
          pagination={{
            ...pageInfo,
            total: fetchData.total,
            onChange: (page, size) => history.push({ search: stringify({ page, size }) }),
          }}
          onClickRow={(_, r) => history.push(details.block(r.blockNo || r.hash))}
        />
      </Card>
    </StyledContainer>
  );
};

export default EpochBlockList;
