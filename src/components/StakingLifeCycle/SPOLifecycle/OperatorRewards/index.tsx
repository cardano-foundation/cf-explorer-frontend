import { useMemo, useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";

import { ADAOrangeBorderIcon } from "src/commons/resources";
import CustomTooltip from "src/components/commons/CustomTooltip";
import { details } from "src/commons/routers";
import { formatADAFull, getShortWallet } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import StyledModal from "src/components/commons/StyledModal";
import Table, { Column } from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import ADAicon from "src/components/commons/ADAIcon";
import CardanoSystem from "src/components/commons/CardanoSystem";
import SPOHolder from "src/components/commons/SPOHolder";
import DrawPath from "src/components/commons/DrawPath";
import { LineArrowItem } from "src/components/commons/LineArrow";
import { WrappModalScrollBar } from "src/components/commons/Table/styles";

import { StyledLink, DrawContainer, ADAOperator, ADATitle, ADAAmount, StyledEpoch } from "./styles";

const OperatorReward = () => {
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data } = useFetch<PoolInfo>(API.SPO_LIFECYCLE.SPO_POOL_INFO(poolId));
  const SPOHolderRef = useRef(null);
  const operatorRef = useRef(null);
  const cadarnoSystemRef = useRef(null);

  const paths = useMemo((): LineArrowItem[] => {
    return [
      {
        start: cadarnoSystemRef,
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
        <CardanoSystem ref={cadarnoSystemRef} />
        <ADAOperator ref={operatorRef} onClick={() => setOpenModal(true)}>
          <ADAOrangeBorderIcon />
          <ADATitle>Operator Rewards</ADATitle>
        </ADAOperator>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: data?.poolName, poolView: data?.poolView, stakeKeys: data?.rewardAccounts }}
        />
        <DrawPath paths={paths} />
      </DrawContainer>

      <OperatorRewardModal open={openModal} handleCloseModal={() => setOpenModal(false)} />
    </Box>
  );
};
export default OperatorReward;

const OperatorRewardModal = ({ ...props }: { open: boolean; handleCloseModal: () => void }) => {
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
      title: "Timestamp",
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
    <StyledModal width={600} {...props} title="Operator rewards received">
      <Box>
        <WrappModalScrollBar>
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
        </WrappModalScrollBar>
      </Box>
    </StyledModal>
  );
};

const StyledTable = styled(Table)(() => ({
  "> :nth-child(2)": {
    boxShadow: "none !important"
  },
  "& nav li > div": {
    width: "100% !important"
  }
}));
