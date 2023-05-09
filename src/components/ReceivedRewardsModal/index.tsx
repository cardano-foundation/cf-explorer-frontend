import React, { useState } from "react";
import {
  AmountADARow,
  CustomModal,
  EpochRow,
  ModalContainer,
  ModalContent,
  ModalTitle,
  RewardBalance,
  RewardBalanceHeader,
  RewardBalanceTitle,
  TableContainer,
  TotalTransaction,
} from "./styles";
import Table, { Column, ColumnType } from "../commons/Table";
import { Box } from "@mui/material";
import { ReceidvedRewardsIC, ADAsigntIC } from "../../commons/resources";
import StyledModal from "../commons/StyledModal";
import { useParams } from "react-router-dom";
import useFetchList from "../../commons/hooks/useFetchList";
import { API } from "../../commons/utils/api";
import { formatADA, formatADAFull, formatDateTimeLocal } from "../../commons/utils/helper";
import ADAicon from "../commons/ADAIcon";
import { details } from "../../commons/routers";

interface ReceivedReward {
  amount: string;
  epoch: number;
  time: string;
}

export function getDumyData(n: number) {
  return Array.from(Array(10)).map((item, i) => ({
    amountADA: "234154851.36871",
    epoch: 76543 + i,
    date: "10/24/2022 14:09:02",
  }));
}

export interface ReceivedRewardsModalProps {
  open?: boolean;
  onClose?: () => void;
  reward: number;
}
const ReceivedRewardsModal: React.FC<ReceivedRewardsModalProps> = ({ open = false, onClose, reward = 0 }) => {
  const [params, setParams] = useState({ page: 0, size: 10 });
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>("");

  const fetchData = useFetchList<RewardDistributionItem>(stakeId ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) : "", {
    ...params,
    sort,
  });

  const columns: Column<ReceivedReward>[] = [
    {
      key: "amount",
      title: "Amount ADA",
      render(data, index) {
        return (
          <AmountADARow>
            {formatADAFull(data.amount)} <ADAicon color="#333333" />
          </AmountADARow>
        );
      },
    },
    {
      key: "epoch",
      title: "Epoch",
      render(data, index) {
        return <EpochRow to={details.epoch(data.epoch)}>{data.epoch}</EpochRow>;
      },
    },
    {
      key: "time",
      title: "Date",
      sort: ({ columnKey, sortValue }) => {
        sortValue ? setSort(`${columnKey},${sortValue}`) : setSort("");
      },
      render(data, index) {
        return <Box>{formatDateTimeLocal(data.time)}</Box>;
      }
    },
  ];
  return (
    <StyledModal open={open} handleCloseModal={() => onClose?.()} width={600}>
      <ModalContainer>
        <ModalTitle>Received Rewards</ModalTitle>
        <ModalContent>
          <RewardBalanceHeader>
            <RewardBalance>
              <ReceidvedRewardsIC />
              <RewardBalanceTitle>Reward Balance: {formatADA(reward)}</RewardBalanceTitle>
              <ADAicon />
            </RewardBalance>
            {/* <TotalTransaction>100 Transactions</TotalTransaction> */}
          </RewardBalanceHeader>
          <TableContainer>
            <Table
              {...fetchData}
              columns={columns}
              total={{ count: fetchData.total, title: "Total Transactions" }}
              pagination={{
                ...params,
                total: fetchData.total,
                onChange(page, size) {
                  setParams({ page: page - 1, size });
                },
              }}
              maxHeight={"calc(70vh - 100px)"}
            />
          </TableContainer>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};

export default ReceivedRewardsModal;
