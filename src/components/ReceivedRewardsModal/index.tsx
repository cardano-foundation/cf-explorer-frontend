import React from "react";
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

interface ReceivedReward {
  amountADA: string;
  epoch: number;
  date: string;
}

const columns: Column<ReceivedReward>[] = [
  {
    key: "amountADA",
    title: "Amount ADA",
    render(data, index) {
      return (
        <AmountADARow>
          {" "}
          {data.amountADA} <ADAsigntIC />{" "}
        </AmountADARow>
      );
    },
  },
  {
    key: "epoch",
    title: "Epoch",
    render(data, index) {
      return <EpochRow>{data.epoch}</EpochRow>;
    },
  },
  {
    key: "date",
    title: "Date",
  },
];

export function getDumyData(n: number) {
  return Array.from(Array(10)).map((item, i) => ({
    amountADA: "234154851.36871",
    epoch: 76543 + i,
    date: "10/24/2022 14:09:02",
  }));
}

export interface ReceivedRewardsModalProps {
  open?: boolean;
}
const ReceivedRewardsModal: React.FC<ReceivedRewardsModalProps> = ({ open = false }) => {
  const data = getDumyData(10);
  return (
    <StyledModal open={true} handleCloseModal={() => {}}>
      <ModalContainer>
        <ModalTitle>Received Rewards</ModalTitle>
        <ModalContent>
          <RewardBalanceHeader>
            <RewardBalance>
              <ReceidvedRewardsIC />
              <RewardBalanceTitle>Reward Balance: 10,000.0 ₳</RewardBalanceTitle>
            </RewardBalance>
            <TotalTransaction>100 Transactions</TotalTransaction>
          </RewardBalanceHeader>
          <TableContainer>
            <Table
              columns={columns}
              data={data}
              total={{ count: 50, title: "Received Rewards" }}
              pagination={{
                page: 1,
                size: 1,
                total: 1000,
              }}
            />
          </TableContainer>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};

export default ReceivedRewardsModal;
