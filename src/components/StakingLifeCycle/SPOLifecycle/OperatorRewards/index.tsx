import { Box, styled } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { ADAOrangeIcon } from "../../../../commons/resources";
import CustomTooltip from "../../../commons/CustomTooltip";
import { details } from "../../../../commons/routers";
import { formatADA, getShortWallet } from "../../../../commons/utils/helper";
import useFetch from "../../../../commons/hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../../commons/utils/api";
import StyledModal from "../../../commons/StyledModal";
import Table, { Column } from "../../../commons/Table";
import useFetchList from "../../../../commons/hooks/useFetchList";
import moment from "moment";
import ADAicon from "../../../commons/ADAIcon";
import { StyledLink, DrawContainer, ADAOperator, ADATitle } from "./styles";
import { useSelector } from "react-redux";
import CardanoSystem from "~/components/commons/CardanoSystem";
import SPOHolder from "~/components/commons/SPOHolder";
import DrawPath from "~/components/commons/DrawPath";
import { LineArrowItem } from "~/components/commons/LineArrow";

const OperatorReward = () => {
  const [openModal, setOpenModal] = useState(false);
  const { poolId = "" } = useParams<{ poolId: string }>();
  const { data } = useFetch<PoolInfo>(API.SPO_LIFECYCLE.SPO_POOL_INFO(poolId));
  const SPOHolderRef = useRef(null);
  const operatorRef = useRef(null);
  const cadarnoSystemRef = useRef(null);
  const { sidebar } = useSelector(({ user }: RootState) => user);

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
          <ADAOrangeIcon />
          <ADATitle>Operator Rewards</ADATitle>
        </ADAOperator>
        <SPOHolder
          ref={SPOHolderRef}
          data={{ poolName: data?.poolName, poolView: data?.poolView, stakeKeys: data?.stakeKeys }}
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
  const [{ page, size }, setPagination] = useState<{ page: number; size: number }>({ page: 0, size: 10 });
  const fetchData = useFetchList<SPO_REWARD>(API.SPO_LIFECYCLE.REWARD(poolId), { page, size, sort });

  const columns: Column<SPO_REWARD>[] = [
    {
      title: "Epoch",
      key: "Epoch",
      minWidth: "50px",
      render: (r) => <Link to={details.epoch(r.epochNo)}>{r.epochNo}</Link>
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
        <Box>
          {formatADA(r.amount)} <ADAicon />
        </Box>
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
    <StyledModal width={600} {...props} title='Operator rewards received'>
      <Box>
        <Box maxHeight={"75vh"} overflow={"auto"}>
          <StyledTable
            {...fetchData}
            columns={columns}
            total={{ title: "Total Epochs", count: fetchData.total }}
            pagination={{
              page,
              size,
              total: fetchData.total,
              onChange: (page, size) => setPagination({ page: page - 1, size })
            }}
          />
        </Box>
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
