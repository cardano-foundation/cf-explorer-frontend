import { useMemo, useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";

import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import CustomModal from "src/components/commons/CustomModal";
import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import ADAicon from "src/components/commons/ADAIcon";
import CardanoBlockchain from "src/components/commons/CardanoBlockchain";
import SPOHolder from "src/components/commons/SPOHolder";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";

import {
  StyledLink,
  DrawContainer,
  ADAOperator,
  ADATitle,
  ADAAmount,
  StyledEpoch,
  StyledADAOrangeBorderIcon
} from "./styles";

const OperatorReward = () => {
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data } = useFetch<PoolInfo>(API.SPO_LIFECYCLE.SPO_POOL_INFO(poolId));
  const SPOHolderRef = useRef(null);
  const operatorRef = useRef(null);
  const cardanoBlockchainRef = useRef(null);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cardanoBlockchainRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        end: operatorRef,
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        startOffset: { 0: [0], sm: [-10] },
        endOffset: { 0: [0, -2], sm: [50] },
        arrow: { 0: "top", sm: "left" }
      },
      {
        start: operatorRef,
        startPosition: { 0: ["center", "bottom"], sm: ["right", "middle"] },
        end: SPOHolderRef,
        endPosition: { 0: ["center", "top"], sm: ["left", "middle"] },
        startOffset: { 0: [0, -14], sm: [-40] },
        arrow: { 0: "top", sm: "left" }
      }
    ];
  }, []);

  return (
    <Box>
      <DrawContainer>
        <CardanoBlockchain ref={cardanoBlockchainRef} />
        <ADAOperator ref={operatorRef} onClick={() => setOpenModal(true)}>
          <StyledADAOrangeBorderIcon />
          <ADATitle>Operator Rewards</ADATitle>
        </ADAOperator>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: data?.poolName, poolView: data?.poolView, stakeKeys: data?.rewardAccounts }}
        />
        <DrawPath paths={paths} />
      </DrawContainer>

      <OperatorRewardModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};
export default OperatorReward;

const OperatorRewardModal = ({ ...props }: { open: boolean; onClose: () => void }) => {
  const { poolId = "" } = useParams<{ poolId: string }>();
  const [sort, setSort] = useState<string>("");
  const [{ page, size }, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 50 });
  const fetchData = useFetchList<SPO_REWARD>(API.SPO_LIFECYCLE.REWARD(poolId), { page, size, sort });

  const columns: Column<SPO_REWARD>[] = [
    {
      title: "Epoch",
      key: "Epoch",
      minWidth: "50px",
      render: (r) => <StyledEpoch to={details.epoch(r.epochNo)}>{r.epochNo}</StyledEpoch>
    },
    {
      title: "Created At",
      key: "time",
      minWidth: "50px",
      render: (r) => <Box>{moment(r?.time).format("MM/DD/yyyy HH:mm:ss")}</Box>,
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      }
    },
    {
      title: "Amount ADA",
      key: "AmountADA",
      minWidth: "50px",
      render: (r) => (
        <ADAAmount>
          +{formatADAFull(r.amount)} <ADAicon />
        </ADAAmount>
      )
    },
    {
      title: "Reward Account",
      key: "RewardAccount",
      minWidth: "50px",
      render: (r) => (
        <CustomTooltip title={r.rewardAccount}>
          <StyledLink to={details.stake(r.rewardAccount)}>{getShortWallet(r.rewardAccount || "")}</StyledLink>
        </CustomTooltip>
      )
    }
  ];
  return (
    <CustomModal {...props} title="Operator rewards">
      <StyledTable
        {...fetchData}
        columns={columns}
        total={{ title: "Total Epochs", count: fetchData.total }}
        maxHeight={"60vh"}
        pagination={{
          page,
          size,
          total: fetchData.total,
          onChange: (page, size) => setPagination({ page: page - 1, size })
        }}
      />
    </CustomModal>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-of-type(2)": {
    boxShadow: "none !important"
  },
  "& nav li > div": {
    width: "100% !important"
  }
}));
