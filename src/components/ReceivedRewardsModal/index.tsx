import { Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useFetchList from "src/commons/hooks/useFetchList";
import { useScreen } from "src/commons/hooks/useScreen";
import { ReceidvedRewardsIC } from "src/commons/resources";
import { details } from "src/commons/routers";
import { API } from "src/commons/utils/api";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";

import ADAicon from "../commons/ADAIcon";
import StyledModal from "../commons/StyledModal";
import Table, { Column } from "../commons/Table";
import {
  AmountADARow,
  EpochRow,
  ModalContainer,
  ModalContent,
  ModalTitle,
  RewardBalance,
  RewardBalanceHeader,
  RewardBalanceTitle,
  TableContainer
} from "./styles";

interface ReceivedReward {
  amount: string;
  epoch: number;
  time: string;
}

export function getDumyData() {
  return Array.from(Array(10)).map((item, i) => ({
    amountADA: "234154851.36871",
    epoch: 76543 + i,
    date: "10/24/2022 14:09:02"
  }));
}

export enum ReceivedRewardsType {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
  ALL = ""
}

export interface ReceivedRewardsModalProps {
  open?: boolean;
  onClose?: () => void;
  reward: number;
  type?: RECEIVED_REWARDS;
}
const ReceivedRewardsModal: React.FC<ReceivedRewardsModalProps> = ({ open = false, onClose, reward = 0, type }) => {
  const [params, setParams] = useState({ page: 0, size: 50 });
  const { stakeId = "" } = useParams<{ stakeId: string }>();
  const [sort, setSort] = useState<string>("");
  const { isMobile, isGalaxyFoldSmall } = useScreen();
  const fetchData = useFetchList<RewardDistributionItem>(
    stakeId ? API.STAKE_LIFECYCLE.RECEIVED_REWARD(stakeId) + (type ? `?type=${type}` : "") : "",
    {
      ...params,
      sort
    }
  );


  const columns: Column<ReceivedReward>[] = [
    {
      key: "amount",
      title: "Amount ADA",
      render(data) {
        return (
          <AmountADARow>
            +{formatADAFull(data.amount)} <ADAicon color="#333333" />
          </AmountADARow>
        );
      }
    },
    {
      key: "epoch",
      title: "Epoch",
      render(data) {
        return <EpochRow to={details.epoch(data.epoch)}>{data.epoch}</EpochRow>;
      }
    },
    {
      key: "time",
      title: "Date",
      sort: ({ sortValue }) => {
        sortValue ? setSort(`id,${sortValue}`) : setSort("");
      },
      render(data) {
        return <Box>{formatDateTimeLocal(data.time)}</Box>;
      }
    }
  ];
  return (
    <StyledModal open={open} handleCloseModal={() => onClose?.()} width={600}>
      <ModalContainer>
        <ModalTitle>
          {type === RECEIVED_REWARDS.LEADER
            ? "Operator Reward"
            : type === RECEIVED_REWARDS.MEMBER
            ? "Delegator Reward"
            : "Received Rewards"}
        </ModalTitle>
        <ModalContent>
          {type == RECEIVED_REWARDS.ALL ? (
            <RewardBalanceHeader>
              <RewardBalance>
                <ReceidvedRewardsIC />
                <RewardBalanceTitle>Reward Balance: {formatADAFull(reward)}</RewardBalanceTitle>
                <ADAicon />
              </RewardBalance>
            </RewardBalanceHeader>
          ) : null}
          <TableContainer>
            <Table
              {...fetchData}
              columns={columns}
              maxHeight={`calc(70vh - ${isMobile ? (isGalaxyFoldSmall ? "270px" : "230px") : "208px"})`}
              total={{ count: fetchData.total, title: "Total Transactions" }}
              pagination={{
                ...params,
                total: fetchData.total,
                onChange(page, size) {
                  setParams({ page: page - 1, size });
                }
              }}
            />
          </TableContainer>
        </ModalContent>
      </ModalContainer>
    </StyledModal>
  );
};

export default ReceivedRewardsModal;
